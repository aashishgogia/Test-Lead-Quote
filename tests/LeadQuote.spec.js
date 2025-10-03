const {test,expect} = require ('@playwright/test');
//const tiledropdown = page.locator(".Title");
const config = require('../countryConfig');

function uniqueName(base) {
  return `${base}_${Math.floor(Math.random() * 100)}`;
}


//test ('Create Offer request', async ({page})=>
test('Create Offer request', async ({ page }, testInfo) => {
  const country = testInfo.project.use.country;  // country comes from config
  const { pincode, phone } = config[country];
  {

 //chrome 
    //const context =await browser.newContext();

    //const page =context.newPage();
        
  //const country = 'at'; // Germany
  const url = `https://qawww.volvocars.com/${country}/quote/`;
  
  //await page.goto("https://qawww.volvocars.com/de/quote/");
  await page.goto(url);

    //await expect(page).toHaveTitle("Volvo Cars | Angebot anfordern");

    //await expect(page).toHaveTitle("Volvo Cars NO | Be om tilbud");


    await page.locator('#onetrust-accept-btn-handler').click();
    
    //await page.getByRole('tab', { name: 'XC40 Mild-Hybrid' }).click();
    const vehiclePicker = page.locator('section[data-testid="vehicle-picker"]');

  // Get the first vehicle button and click it
  await vehiclePicker.locator('button[role="tab"]').first().click();

  /*
    //await page.locator("#address-autocomplete_input-input").fill("83043");
    const pincodes= {
    de: '10115', // Berlin
    fr: '75001', // Paris
    it: '00184', // Rome
    es: '28001', // Madrid
    se: '11120', // Stockholm
    no: '0010', //oslo
    at: '1010', //austria
  };

    // Fill the postal code into the input
  // Pick pincode dynamically
const pincode = pincodes[country] || '00000'; // fallback if country not mapped
*/

// Fill the input
await page.locator("#address-autocomplete_input-input").fill(pincode);


    await page.waitForSelector("#address-autocomplete_suggestions >> li", { timeout: 50000 });
    
    await page.locator("#address-autocomplete_suggestions >> li").first().click();
    await page.waitForSelector("[data-testid^='retailersuggestion_']", { timeout: 5000 });
    
    await page.locator("[data-testid^='retailersuggestion_']").first().click();
    
   const titleDropdown = page.locator('select[data-testid="ff-title"]');

// Use :not([value=""]) to skip placeholder
const realOptions = titleDropdown.locator('option:not([value=""])');

if (await realOptions.count() > 0) {
  const firstOption = realOptions.first();
  const value = await firstOption.getAttribute('value');
  await titleDropdown.selectOption(value);
  console.log(`Selected first title option: ${value}`);
} else {
  console.log("No selectable title option available, skipping...");
}



   const genderDropdown = page.locator('select[data-testid="ff-gender"]');

// Skip the placeholder by selecting options with non-empty value
const gOptions = genderDropdown.locator('option:not([value=""])');

if (await gOptions.count() > 0) {
  const firstOption = gOptions.first();
  const value = await firstOption.getAttribute('value');
  await genderDropdown.selectOption(value);
  console.log(`Selected first gender option: ${value}`);
} else {
  console.log("No selectable gender option available, skipping...");
}
   




    await page.locator('[data-testid="ff-first-name"]').fill(uniqueName('TestPlay'));  //First name

    await page.locator('[data-testid="ff-surname"]').fill(uniqueName('wright')); //Last Name E-Mail-Adresse
    
    //await page.locator('[data-testid="ff-email-async"]').fill(`${uniqueName("playwright")}@invalid.com`); // E-Mail-Adresse   //ff-email-async 

    //await page.locator('input[type="email"][name="Email"]').fill(`${uniqueName("playwright${country}")}@invalid.com`);

    const email = `${uniqueName(`playwright${country}`)}@invalid.com`;

    //await page.locator('input[type="email"][name="Email"]').fill(email);
    await page.locator('[data-testid="ff-email-async"], [data-testid="ff-email"]').fill(email);

/*    
    const phoneNumbers = {
  de: "1701234567", // Germany
  fr: "612345678",  // France
  it: "3401234567", // Italy
  es: "6001234567", // Spain
  no: "74854878", // norway
  se: "723857741", // Sweden
  at: "19289266", // Sweden
};
const phoneNumber = phoneNumbers[country] || "74859652"; // fallback
  */
   await page.locator('[data-testid="ff-phone-with-country-code"]').fill(phone); //   Telefonnummer  //ff-phone-with-country-code
    
   // await page.locator('[data-testid="ff-legal-address-async"]').fill(pincode);  //ff-legal-address-async
   
    const addressField = page.locator('[data-testid="ff-legal-address-async"], [data-testid="ff-address-async"]');

// Wait until it's visible
await expect(addressField).toBeVisible({ timeout: 30000 });

// Fill the pincode (from your config)
await addressField.fill(pincode);




// Wait for dropdown suggestions
await page.waitForSelector('#legalAddress_suggestions li, #LegalAddress_suggestions li', { timeout: 30000 });

// Pick the first suggestion
await page.locator('#legalAddress_suggestions li, #LegalAddress_suggestions li').first().click();
    
   /* await page.waitForSelector('#legalAddress_suggestions li, #LegalAddress_suggestions li', { timeout: 80000 });
    
    await page.locator('#legalAddress_suggestions li, #LegalAddress_suggestions li').first().click();
    */
    await page.locator('[data-testid="ff-notes"]').fill('Test Playwrite ${country}'); //     Free text  #customer-information-submit ff-notes
    
    await page.locator('#OneMarketingConsent_optin-input, #oneMarketingConsent-input').click();
    
    await expect(page.locator('#OneMarketingConsent_optin-input, #oneMarketingConsent-input')).toBeChecked();  //oneMarketingConsent-input


    await page.locator('[data-testid="customer-information-submit"]').click(); //       #customer-information-submit

    //const thankYouHeading = await page.locator('h2', { hasText: 'Vielen Dank für Ihr Interesse am XC40' }); //data-testid="thank-you-page-root"
    //console.log(await thankYouHeading.textContent());
   
    await expect(page.locator('h2.heading-2')).toBeVisible();

    // const thankYouHeading = page.locator('div[slot="main"] h2');
    //await expect(thankYouHeading).toHaveText(new RegExp(vehiclePicker));
}

}
);
