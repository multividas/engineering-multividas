---
title: 'Ansible playbooks'
date: 2024-09-12
author: Soulaimane Yahya
gravatar: b07a2846505a2629b7123ad50d5e21c303cf7c562a8893473c2114f7491c7796
twitter: '@soulaimaneyh'
image: 'https://raw.githubusercontent.com/multividas/engineering-multividas/main/thumbnails/ansible-playbooks.jpg'
---

In this article, we’ll explore in depth Ansible playbooks for automation

---

### Table Of Contents

- Ansible
- Ansible ad-hoc commands
- Ansible playbooks

# Ansible

Ansible is an open-source, cli IT automation Tool written in Python, is used:
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

Ansible follows push model and agentless architecture

we can use Ansible;
- **Ansible CLI commands** - called ad-hoc commands, done with modules
- **Ansible Playbooks** - Written in YAML Files

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

```sh
[defaults]
inventory = inventory.ini
private_key_file = ~/.ssh/id_ansible
```


The Ansible Inventory File `(inventory.ini)` lists target hosts and groups for Ansible to manage. It can include hostnames, IPs, and variables like usernames, ports, and SSH keys. It organizes systems for automation tasks.

```sh
[webservers]
host1 ansible_host=ns1.multividas.com ansible_user=root ansible_port=22
host2 ansible_host=ns2.multividas.com ansible_user=root ansible_port=22
```

To ping all hosts in the inventory using Ansible:

```sh
ansible all -m ping
```

## Ansible playbooks

Ansible playbooks are YAML files that define a series of tasks to be executed on our fleet.

```sh
---

- hosts: all
  tasks:

  - name: update repository index
    apt:
      update_cache: yes
```

- `hosts: all`: Targets all hosts in the inventory.
- `tasks:`: Defines the tasks to be performed on the hosts.

  - `name: update repository index`: Describes the task.
  - `apt:`: Uses the Ansible apt module to manage packages on Debian/Ubuntu systems.
      - `update_cache: yes`: Updates the package repository cache.

Runs the command:

```sh
ansible-playbook ansible-playbooks/update_cache.yaml
```
