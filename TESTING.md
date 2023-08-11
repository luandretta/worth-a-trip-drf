# 🚀 TESTING

For a proper conclusion to this project several tests were performed, but they are described in the frontend repository.

Here you will find issues related to the construction of this backend application.

Return back to the [README.md](README.md) file.

Go to [Worth a Trip Frontend application](https://github.com/luandretta/worth-a-trip-frontend)

## RESPONSIVENESS TESTING

- - -

## BROWSER COMPABILITY TESTING

## ☠️ BUGS RESOLVED AND UNRESOLVED ☠️

The issues listed in the table below were indentified during the development of the project.

|N.| Issue |  Action | Screenshots | Status | 
|:---|:--- |:--- |:--- | :------- |
|01| After delete slug from Post model raised an error ![Bug 01](documentation/bugs/bug1.png) | Delete migrations and migrate again |  ------ | Closed | 
|02| No such column: profiles_profile.id[Bug 02](documentation/bugs/bug2-profile.png) | Command ``python manage.py migrate profiles zero`` to reset the migrations on the database, then  migrate again |  ------ |  Closed | 
| 03 | Placeholder from Password input in the Sign In Form with a comma | Comma was removed from string| ------ | Closed |

## LIGHTHOUSE TESTING OUTCOMES

## CODE VALIDATION

## USER STORIES TESTING

## FEATURES TESTING

## AUTOMATED TESTING

The Django's Built-in Unit Testing Framework was used to test the application functionality on the project without errors.
To perform the test the following step was used:
- In the terminal type the command:

```bash
python3 manage.py test
```


Return back to the [README.md](README.md) file.