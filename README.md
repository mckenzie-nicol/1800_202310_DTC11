# Project Title

## 1. Project Description
Our team, Team #11 is developing our product - SlipSafe, to help people who commute by walking to have an easier time during snowy weather by showing the users which paths or sidewalks have been cleared of snow or ice. 

## 2. Names of Contributors
* Hi my name is Mckenzie.
* Hi my name is Alex, and I am not looking forward to the video
* My name is Chun Ting Brian.
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Leaflet/Openstreets 1.9.3 (API, map functionality)

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Users must sign in in order to use the app currently, the pages with main functionalty are not available otherwise.
* Users browser must support geolocation data for self locate functionality

## 5. Known Bugs and Limitations
Here are some known bugs:
* When we first launch the app, the screen will always pan to "HOME" icon instead of user's location.
* Map scaling issues when we were using Leaflet's API
* ...

## 6. Features for Future
What we'd like to build in the future:
* Weather bar at the top to show temperature and weather at user's location
* Search feature that allows user's searches
* Saved features to show user's previously submitted reports as well as location user has saved
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── profile.html               # profile page for users view info on current user
├── main.html               # main paging containing map and other core functionality
├── login.html               # page prompting user to login with account information, or create new profile
└── README.md                # general info about the application


It has the following subfolders and files:
├── .git                   # Folder for git repo
├── images                      # Folder for images
    /SlipSafe logo.png          # Main logo for app
    /Green slipsafe logo.png    # Green version of logo
    /hous_location_icon.png     # Logo for go to home button
    /location_pin.png           # Logo for locate self button
├── scripts                # Folder for scripts
    /authentication.js          # checks for authenticated user sign in. If user is signed it returns true. If user is a new user, a new entry will be entered in firebase 'users' collection.
    /firebaseAPI_TEAMDTC11.js   # Contains project firebase information, including firebase apiKey and project specififc firebase identifiers. Calls core firebase functionality. Blacklisted from git by .gitignore
    /footer.js                  # calls functions from map.js on click of elements in footer_after_login.html
    /logged_in.js               # display currently logged in user's 'name' field from firebase, else if no user is logged in display no users logged in
    /maps.js                    # Core app functionality. Creates an interactive map element populated with information from user profile and report icons taken from the reports collection in firebase.
    /profile.js                 # populate profile.html with user information from firebase
    /skeleton.js                # populate main with html elements
    /submission.js              # report functionality, writing to firebase reports collection
├── styles                 # Folder for styles
    /access.css                 # 
    /logged_in.css              # 
    /style.css                  # contains primary map css properties and styling for custom html map icons
    /submission.css             # 
    /submitted.css              # 
├── text                   # Folder for called html elements
    /.gitignore                 # ignores specific elements from being pushed to git, including firebaseAPI_TEAMDTC11.js
    /access_location.html       # 
    /acess_photos.html          # 
    /footer_after_login.html    # 
    /footer_before_login.html   # 
    /map.html                   # main map element, populated by map.js. Called by skeleton.js
    /nav.html                   # top navbar element with dropdown of options. Displays user profile. Called by skeleton.js
    /resubmit_photo.html        # 



```


