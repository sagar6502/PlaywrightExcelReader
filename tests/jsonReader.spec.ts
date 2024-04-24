import { test, expect, Page } from '@playwright/test';
import Sample1 from '../resources/SAMPLE1.json'
import Sample2 from '../resources/SAMPLE2.json'
import SampleWork from '../resources/SampleWork.json'
import SampleWk1 from '../resources/SampleWk1.json'


test('Read Single JSON ', async ({ page }) => {
    console.log("Reading JSON File");
    const strJSON = JSON.stringify(Sample1);
    var jsonObject = JSON.parse(strJSON);
    
    var dataMap = new Map(Object.entries(jsonObject));
    var resultMap = new Map();

    for (const key of dataMap.keys())  {
        let keyV = dataMap.get(key);
        resultMap.set(key, keyV);
    }
    console.log("Map Values stored :: ");
    for (let [key, value] of resultMap) {
        console.log(key + " is " + value);
    }
    console.log("done!");
    // console.log(Sample1)
    // console.log(Sample1.fruit);
    // console.log(Sample1.size);
    // console.log(Sample1.color);
});

test('Read sample2  ', async ({ page }) => {
    
    console.log(Sample2);
    console.log(Sample2.users[1]);
});

test.only('Find Sample JSON Data ', async ({ page }) => {
    const keyValue = 8768761;
    let found = false;
    console.log(SampleWork.length);
    for(let i = 0; i < SampleWork.length; i++){
        if(SampleWork[i].id === keyValue){
            console.log('Data found for the given key :: '+keyValue)
            console.log(SampleWork[i]);
            found = true;
        }
    }
    if(!found){
        console.log('No relevant data found for the given key-value :: '+keyValue)
    }
    expect(found).toBeTruthy();
    
});