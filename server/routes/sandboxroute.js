/* import express, { Router } from 'express';


const router = express.Router();

*/
// import { check } from 'express-validator/check';
// import winston from 'winston';
// import businesses from '../model/businessModel';

// const businessId = 1;
// const result = businesses.find(element => element.id === businessId);
// const numberOfKeys = Object.keys(businesses).length;
// winston.info(result);
// winston.info(numberOfKeys);

// const myobject = {
//   id: 1,
//   name: 2
// };
// const myarr = [];
// myarr.push(myobject);
// winston.info(myarr.length);
import winston from 'winston';
import businesses from '../model/businessModel';

const newBusiness = {
  id: 4,
  name: 'WayneNlucian',
  location: 'aba',
  mobile: '08025786657',
  description: 'Thisisthedescription',
  url: 'www.eand.com',
  category: 'IT'
};
const anotherArray = [];
const newArray = ['string', 'again'];

const result = (businesses.find(element => element.name === newBusiness.name));
for (let i = 0; i < businesses.length; i += 1) {
  if (businesses[i].name === newBusiness.name) {
    anotherArray.push(businesses[i]);
  }
}
winston.info(result);
winston.info(newArray);
winston.info(anotherArray);
winston.info(anotherArray.length);
