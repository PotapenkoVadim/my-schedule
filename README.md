# My Schedule
The application is designed to record and visualize orders. It allows users to view information about orders in two formats: as color schemes on the calendar and as a table. Each order has its own color, which is selected by the user, and status, which can change over time. The order status is displayed on the calendar in different ways depending on its current status.
The application also supports a role model with three levels of access: administrator, user, and temporary user. The administrator has the ability to add new users. Users and temporary users have access to the main functions of the application, but temporary users' access to the application is limited to 24 hours.

![calendar](https://github.com/PotapenkoVadim/my-schedule/blob/dev-3.0/src/assets/images/calendar.png?raw=true)

### Scripts
- `yarn web:build` - build a web client
- `yarn desktop:build` - build a desktop client