---
title: 'Ansible playbook'
date: 2024-11-15
author: Soulaimane Yahya
gravatar: b07a2846505a2629b7123ad50d5e21c303cf7c562a8893473c2114f7491c7796
twitter: '@soulaimaneyh'
image: 'https://raw.githubusercontent.com/multividas/engineering-multividas/main/thumbnails/ansible-playbook.jpg'
---

In this article, we’ll explore in depth Ansible playbook for automation

---

### Table Of Contents

- Ansible
- Ansible ad-hoc commands
- Ansible playbook

# Ansible

Ansible is an open-source, cli IT automation Tool written in Python

[github.com/ansible](https://github.com/ansible/ansible)

Ansible is used:
- configure systems, expls;
  - create dbadmin user on all servers
  - open some port on all db servers

- deploy softwares, expls;
  - Install nc command on all servers
  - install webserver

- Update systems / apply patches

- Provisioning, expls;
  - Provisioning servers - But terraform is the best tool for it

Ansible is configuration management tool

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

`ansible.cfg` file configures default settings for Ansible.

```ini
[defaults]
inventory = inventory.ini
private_key_file = ~/.ssh/id_ansible
```


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

### Ansible managing services

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

## Ansible Template

Ansible template is used to manage configuration files by rendering them from Jinja2 templates, it's copies a file to a target machine after processing variables (e.g., from Ansible playbook or inventory).

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

`nginx.conf.j2` template uses variables like **{{ ansible_fqdn }}** and **listen_port** to create a customized configuration file on each target system.

`ansible_fqdn` is a built-in Ansible fact that automatically collects the FQDN of the target system during the playbook run.

Expl;

[Ansible playbook Github Repo](https://github.com/soulaimaneyahya/ansible-playbook)

### Roles

Ansible role is a way to organize automation tasks into reusable components

`install_nginx.yaml` playbook that installs, enables, and starts NGINX using a role.

#### Role Structure:

```sh
roles/
  nginx/
    tasks/
      main.yml
    meta/
      main.yml
```

- roles/nginx/tasks/main.yml

```yaml
---
# tasks file for nginx

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
```

- roles/nginx/meta/main.yml

```yaml
---
dependencies: []
```

#### install_nginx.yaml (The Playbook):

```yaml
---
- hosts: webservers
  become: yes
  roles:
    - nginx
```

The `install_nginx.yaml` playbook uses the nginx role to install NGINX on all hosts in the webservers group.

In summary, the role installs NGINX via the `apt` module (for Debian-based systems) and ensures the service is enabled and started using `systemd`.

### Additional Resources

- [Ansible playbook Github Repo](https://github.com/soulaimaneyahya/ansible-playbook)

### Conclusion

Anible is used by biggest-tech companies for its simplicity, scalability, and ease of use in DevOps and IT infrastructure management.
