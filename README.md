# Bin4Dev

Bin4dev is a website where user can add, edit a piece of code or any text and generates a short url which further can be used to access to document. By default the expiry of 
the created document is 1 day but if user want then he can extend the expiry for another a day under dashboard page. Here user can easily manage all the created documents and
the created document can be of any language our app will automatically recongnize the language and highlights different keywords of the code as per the language. If any link is
pasted as the text then, our app will autmatically recognize the link (only if the pasted link is an absolute link otherwise it will save the link as text) and generates a
short url that refers to that link.


# Tech/ Stack Used 

I have created an **express app with ejs template files** to structure the application and **MongoDB** for creating dedicated database for each user. Since the app requires **user login and Signup system** so i have used **bCrypt package** to secure user details from anonymous person. I have used **MongoDB Atlas** for database which is easy to use as well as can be access from anywhere as it save the database over cloud. In order to safe sensitive details i have created **.env file** and configured using **dotenv package**. I have also used **short.co API** for shortening the urls https://api.shrtco.de/v2/shorten?url=polynomial.ai and **node-fetch for making api calls** from the backend.


# Deployment Link

I have deployed the webapp on **Heroku Plateform**.
you can use https://bin4dev.herokuapp.com/ to visit the web app.


# Website SetUp

Firstly copy https://github.com/Pratik4488/BIn4Dev.git , this link


then open projects folder or any destination where you want to save the codes.

open powershell or terminal for corresponding folder

type the following command on terminal

git clone https://github.com/Pratik4488/BIn4Dev.git


then you will see codebinV2 folder is created



now write following commands one by one


cd codebinV2

npm install

after successful installation of all the dev dependencies we are good to goo with the website on our local engine. for this type following commands,

npm start

and open  http://localhost:80

and the app will launch in your browser.


# Demo Video and Photo link

you can have demo videos as well as images of the working of website on

https://drive.google.com/drive/folders/1J28kL90ofFAW3cNuf2F7ex_n1YEjG_CS?usp=sharing

and also share relevant feedback on b419042@iiit-bh.ac.in


# Developer

**Pratik Kumar**

Contact no: **6206508473**

Email: **b419042@iiit-bh.ac.in**

Alt-Email: **pratikmgr4488@gmail.com**

From: ** IIIT BHUBANESWAR **

**IT BRANCH (2019 -2023)**
