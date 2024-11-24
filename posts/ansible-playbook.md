---
title: 'Ansible playbook'
date: 2024-11-15
author: Soulaimane Yahya
gravatar: b07a2846505a2629b7123ad50d5e21c303cf7c562a8893473c2114f7491c7796
twitter: '@soulaimaneyh'
image: 'https://raw.githubusercontent.com/multividas/engineering-multividas/main/thumbnails/ansible-playbook.jpg'
---

In this article, we’ll dive deep into Ansible playbook for automation

---

### Table Of Contents

- Ansible
- Ansible ad-hoc commands
- Ansible playbook
- Ansible Vault

# Ansible

Ansible is an open-source configuration management tool, cli IT automation Tool written in Python; [github.com/ansible](https://github.com/ansible/ansible)

Ansible is used:
- configure systems, expls;
  - create dbadmin user on all servers
  - open some port on all db servers

- deploy softwares, expls;
  - Install nc command on all serverss
  - install webserver

- Update systems / apply patchestate

- Provisioning, expls;
  - Provisioning servers - But terraform is the best tool for it

Ansible follows push model and agentless architecture, means you don't need to install an agent on the target machines; it uses SSH (or WinRM for Windows) for communication.

we can use Ansible;
- **Ansible CLI commands** - called ad-hoc commands, done with modules
- **Ansible Playbook** - Written in YAML Files

## Ansible ad-hoc commands

**Generate SSH keys** (if not already created):

```sh
ssh-keygen -t rsa -f ~/.ssh/id_ansible
```

**Copy the public key** to the `authorized_keys` file on all remote hosts:

```sh
ssh-copy-id -i ~/.ssh/id_ansible.pub user@host1
```

**Ensure SSH access** by testing the connection to your remote host:

```sh
ssh -i ~/.ssh/id_ansible root@host1
```

> the same for other hosts

### The configuration file

`ansible.cfg` file configures default settings for Ansible.

```ini
[defaults]
inventory = inventory.ini
private_key_file = ~/.ssh/id_ansible
```

Changes can be made and used in a configuration file which will be searched for in the following order:

- ANSIBLE_CONFIG (environment variable if set)
- ansible.cfg (in the current directory)
- ~/.ansible.cfg (in the home directory)
- /etc/ansible/ansible.cfg

Ansible will process the above list and use the first file found, all others are ignored.

The Ansible Inventory File `(inventory.ini)` lists target hosts and groups for Ansible to manage. It can include hostnames, IPs, and variables like usernames, ports, and SSH keys. It organizes systems for automation tasks.

```ini
[webservers]
host1 ansible_host=ns1.multividas.com ansible_user=root ansible_port=22
host2 ansible_host=ns2.multividas.com ansible_user=root ansible_port=22
```

To ping all hosts in the inventory using Ansible:

```sh
ansible all -m ping
```

> NB: it's not just ICMP ping, it's an ssh connection to target servers

## Ansible playbook

Ansible playbook are YAML files that define a series of tasks to be executed on our fleet.

```yaml
---

- hosts: all
  tasks:

  - name: update repository index
    tags: always
    apt:
      update_cache: yes
    when: ansible_distribution == "Ubuntu"
```

- `hosts: all`: Targets all hosts in the inventory.
- `tasks:`: Defines the tasks to be performed on the hosts.

  - `name: update repository index`: Describes the task.
  - `tags: always`: This tag ensures the task is always executed, even if the playbook is run with specific tags.
  - `apt:`: Uses the Ansible apt module to manage packages on Debian/Ubuntu systems.
      - `update_cache: yes`: Updates the package repository cache.

- `update_cache`: yes: Refreshes package lists (like apt update).
- `only_update`: true: Upgrades installed packages (like apt upgrade).

- `when`: The task runs condition (e.g. the target system's OS is Ubuntu).

Runs the command:

```sh
ansible-playbook ansible-playbook/update_cache.yaml
```

### Tags

`Tags` allow you to run specific parts of a playbook by categorizing tasks.

```yaml
tasks:
  - name: Install Nginx
    apt:
      name: nginx
      state: present
    tags: nginx

  - name: Install MySQL
    apt:
      name: mysql-server
      state: present
    tags: mysql
```

#### CLI Commands:

Run only Nginx tasks:

```sh
ansible-playbook playbook.yml --tags nginx
```

Skip MySQL tasks:

```sh
ansible-playbook playbook.yml --skip-tags mysql
```

### Managing services

Expl Playbook:

```yaml
tasks:
  - name: Install Nginx
    apt:
      name: nginx
      state: present
    tags: nginx
    register: nginx_register

  - name: Ensure Nginx is enabled and started
    service:
      name: nginx
      state: started
      enabled: true
    register: nginx_service

  - name: Deploy Nginx configuration
    template:
      src: nginx.conf.j2
      dest: /etc/nginx/nginx.conf
    register: nginx_conf_register

  - name: Restart Nginx if changes detected
    service:
      name: nginx
      state: restarted
    when: nginx_conf_register.changed

```

Manage Service:
- `state: started`: Ensures the service is running.
- `enabled: true`: Ensures the service starts at boot. (like systemctl enabled nginx)

- `template` copies a configuration file `(nginx.conf.j2)` to the target server.
- Changes are detected and tracked via register: `nginx_conf_register`.
- restart Nginx on `nginx_conf_register.changed`

`lineinfile` module in Ansible is used to manage specific lines in a file, such as adding, removing, or modifying a line based on a regular expression pattern, expl;

```yaml
tasks:
  - name: Ensure the server name is set in Nginx config
    lineinfile:
      path: /etc/nginx/nginx.conf
      regexp: '^server_name'
      line: 'server_name multividas.com;'
      state: present
    register: nginx_conf_register
```

- The `lineinfile` module ensures that the `server_name` directive in `/etc/nginx/nginx.conf` is set to `multividas.com`.
- If the line starting with `server_name` already exists, it will be modified; if it doesn't exist, it will be added.

#### State Summary:

- `present`: Ensures the resource is installed or exists.
- `absent`: Ensures the resource is removed.
- `latest`: Ensures the resource is the latest version available.
- `stopped`: Ensures the service is stopped.
- `started`: Ensures the service is started.
- `reloaded`: Ensures the service is reloaded (typically to apply configuration changes).
- `directory`: Ensures a directory exists.
- `file`: Ensures a file exists.

::: info
Be careful with this, there is possibility that you duplicate changes every time you run this
:::

### Roles

Ansible role is a way to organize automation tasks into reusable components

`install_nginx.yaml` playbook that installs, enables, and starts NGINX using a role.

#### Role Structure:

dir structure:

```sh
roles/
  nginx/
    tasks/
      main.yml
    meta/
      main.yml
```

`roles/nginx/tasks/main.yml`

defines the tasks for the NGINX role:

```yaml
---
---
# Tasks for NGINX installation and management

- name: Ensure NGINX is installed
  apt:
    name: nginx
    state: present
    update_cache: yes
  tags:
    - nginx
  register: nginx_install_result

- name: Ensure NGINX service is enabled and started
  service:
    name: nginx
    state: started
    enabled: true
  tags:
    - nginx
  register: nginx_service_result
```

Key Points:

- `update_cache: yes`: Ensures the apt cache is updated before attempting to install the package.
- Registers (`nginx_install_result`, `nginx_service_result`) can be used for debugging or conditional tasks.

`roles/nginx/meta/main.yml`

defines metadata and dependencies for the role:

```yaml
---
# Metadata for the NGINX role
dependencies: []
```

#### Playbook: install_nginx.yaml

playbook to utilize the role and target specific hosts:

```yaml
---
- name: Install and configure NGINX
  hosts: webservers
  become: yes
  roles:
    - nginx
```

The `install_nginx.yaml` playbook uses the nginx role to install NGINX on all hosts in the webservers group.

to execute the playbook, run:

```sh
ansible-playbook -i inventory install_nginx.yaml
```

In summary;

- organizes tasks using roles: Makes the playbook modular and reusable.

### Host variables and Handlers

#### Host Variables:

Host variables in Ansible can be defined in several places:

- **Inventory file**: Inline or in a `group_vars` or `host_vars` directory.
- **Playbook**: Defined under the vars section.
- **Dynamic inventory**: Retrieved from external sources.

expl in inventory:

```ini
[webservers]
host1 ansible_host=ns1.multividas.com
host2 ansible_host=ns2.multividas.com

[webservers:vars]
nginx_port=8080
```

`nginx_port` variable is set for all hosts in the `webservers` group, and `ansible_host` specifies the target host's IP or FQDN

#### Handlers:

Handlers are special tasks in Ansible that only run when explicitly triggered by another task. They are typically used to perform actions like restarting services, reloading configurations, or notifying other processes after certain tasks have changed the system., expl:

```yaml
tasks:
  - name: Deploy Nginx configuration
    template:
      src: nginx.conf.j2
      dest: /etc/nginx/nginx.conf
      vars:
        server_name: "{{ ansible_fqdn }}"
        listen_port: 80
    notify: restart nginx

  - name: restart nginx
    systemd:
      name: nginx
      state: restarted
```

- The `copy` task updates the `nginx.conf` file.
- The `notify` directive triggers the handler `Restart Nginx`, which restarts the Nginx service.

Handlers are only executed when there is a change made by the triggering task. 

### Templates

Ansible templates allow you to manage configuration files by rendering them from Jinja2 templates. These templates are used to generate files dynamically by substituting variables, either from the playbook or inventory, before copying them to the target machine.

```yaml
tasks:
  - name: Deploy Nginx configuration
    template:
      src: nginx.conf.j2
      dest: /etc/nginx/nginx.conf
      vars:
        server_name: "{{ ansible_fqdn }}"
        listen_port: 80
```

`the nginx.conf.j2` template file uses variables like `ansible_fqdn` (the fully qualified domain name of the target system) and `listen_port` (which is explicitly set to 80) to create a customized Nginx configuration on each target system.

`ansible_fqdn` is an automatically collected Ansible fact that retrieves the FQDN (Fully Qualified Domain Name) of the target system during the execution of the playbook.

This allows for creating system-specific configurations without manually modifying each configuration file.

### Most commonly used Ansible modules

| **Module**   | **Description**                                                      |
|--------------|----------------------------------------------------------------------|
| **package**  | Manages package installation, updates, and removal.                 |
| **service**  | Starts, stops, and manages system services.                         |
| **user**     | Creates, modifies, and manages users on remote hosts.               |
| **file**     | Manages file and directory permissions, ownership, and state.       |
| **copy**     | Copies files and templates to remote servers.                       |
| **shell**    | Executes shell commands and scripts on remote servers.              |
| **debug**    | Displays debugging information for tasks in playbooks.              |
| **uri**      | Makes HTTP requests to web servers or APIs.                         |
| **script**   | Executes custom scripts on remote servers.                          |
| **command**  | Runs commands on remote servers (without shell processing).         |
| **become**   | Elevates privileges for tasks that require higher permissions.      |
| **apt**      | Manages packages on Debian-based systems (e.g., Ubuntu).            |
| **yum**      | Manages packages on RHEL-based systems (e.g., CentOS, Fedora).      |
| **firewalld**| Manages firewall settings and rules on Linux systems.               |

## Ansible Vault

1. Encrypt a Template File

Encrypt the `.env.j2` file using Ansible Vault:

```sh
ansible-vault encrypt templates/.env.j2
```

This will prompt you for a password to encrypt the file.
2. Decrypt a Template File

Decrypt the `.env.j2` file when needed:

```sh
ansible-vault decrypt templates/.env.j2
```

3. View an Encrypted Template File

If you only want to view the contents of the encrypted file without decrypting it:

```sh
ansible-vault view templates/.env.j2
```

4. Using the Encrypted Template in a Playbook

```sh
- name: Deploy environment file
  template:
    src: templates/.env.j2
    dest: /project/.env
```

Ensure you pass the Vault password when running the playbook.

5. Run Playbook with Vault Password

Provide the Vault password using `--ask-vault-pass`:

```sh
ansible-playbook playbook.yml --ask-vault-pass
```

Alternatively, use a password file for automation:

```sh
ansible-playbook playbook.yml --vault-password-file /templates/.env.j2
```

> NB: Do not push `.env.j2` prod conf file on GitHub (even encrypted using Ansible Vault)

### Additional Resources

- [Ansible playbook GitHub Repo](https://github.com/soulaimaneyahya/ansible-playbook)

### Conclusion

Anible is used by biggest-tech companies for its simplicity, scalability, and ease of use in DevOps and IT infrastructure management.
