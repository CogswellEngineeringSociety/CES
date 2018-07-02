export const navPages = [
    {
      name: "Home",
      url: "/",
    },
   {
      name: "Events",
      url:"/events"
    },
    {
      name:"Blog",
      url:"/blog"
    },
]

export const servicePages = [
    //Either drop down for services or just flat link to it.
    {
      name:"Library",
      url:"https://ces.library.com"
    },
   {
      name:"3DPrinting",
      //url:"https://ces.3Dprinting.com"
      url:"http://localhost:3001"
    }
    
];

export const LOGIN_PATH = "/users/login";
export const REGISTER_PATH = "/users/register";
export const ACCOUNT_RECOVERY_PATH = "/users/account-recovery";
export const RESET_PASSWORD_PATH = "/account/reset";
//Will decide whether uid or name later, it's easy change.
export const USER_PROFILE_PATH = "/account/:uid";
//Only owner can get to inventory and update profile
export const USER_INVENTORY_PATH = "/account/inventory";
export const UPDATE_USER_PROFILE_PATH = "/account/update";
export const BLOG_PATH = "/blog";
export const EVENTS_PATH = "/events";



