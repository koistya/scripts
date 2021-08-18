#!/usr/bin/env zx

import puppeteer from "puppeteer-extra";
import stealth from "puppeteer-extra-plugin-stealth";

puppeteer.use(stealth());

// Launch a new browser window
const browser = await puppeteer.launch({
  headless: false,
});

// Close the first tab
let [page] = await browser.pages();
await page.close();

// Navigate to the Google Account page
page = await browser.newPage();
const res = await page.goto(
  "https://accounts.google.com/signin/v2/identifier",
  { waitUntil: "networkidle2" }
);

if (res.status() !== 200) {
  throw new Error(`Error ${res.status}: ${res.statusText}`);
}

// Input user's email address
await page.type("input[name=identifier]", "user@gmail.com");
await page.keyboard.press("Enter");
await page.waitForNavigation({ waitUntil: "networkidle2" });
await page.waitForTimeout(2000);

// Input user's password and hit Submit
await page.waitForSelector("input[type=password]");
await page.type("input[type=password]", "Passw0rd!");
await page.keyboard.press("Enter");
