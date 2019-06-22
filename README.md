# Social Networking App

A basic Social Networking app created in Node.js using Express web framework.

## Technology Stack

- Node.js
- Express
- Handlebars
- Passport
- MySQL
- Sequelize
- Socket.io
- HTML, CSS, JS, Bootstrap

## Usage and Setup

### Installation

Install nodejs and MySQL

Setup MySQL database with the following: 

if setup root with password
```bash
mysql -u root -p
```
without password
```bash
mysql -u root
```
In the MySQL command line interface: 

```sql
CREATE DATABASE socialdb;

CREATE USER socialadmin IDENTIFIED BY 'facebook';

USE socialdb;

GRANT ALL PRIVILEGES ON socialdb.* TO socialadmin;

FLUSH PRIVILEGES;
```
### Setup

```bash
git clone https://github.com/iamanuragmahendru/social-networking-site
cd social-networking-site
npm i
npm start
```
