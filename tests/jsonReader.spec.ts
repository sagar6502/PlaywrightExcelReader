import { test, expect, Page } from '@playwright/test';
import Sample1 from '../resources/SAMPLE1.json'
import Sample2 from '../resources/SAMPLE2.json'
import SampleWork from '../resources/SampleWork.json'
import SampleWk1 from '../resources/SampleWk1.json'
import NewSample from "../resources/NewSample.json"

test('Find Sample JSON Data ', async ({ page }) => {
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

test.only('Read sample2 newRecursive Search  ', async ({ page }) => {
    const results = searchJSON(NewSample, "", "-21575-84275",[]);
    if(results.length ==0){
        console.log("Data not found")
    }else{
        console.log("relevant Data is :: ")
        console.log(results);
    }
});

function searchJSON(obj, searchKey, searchValue, results) {
    // Initialize results array if not provided
    if (!results) {
        results = [];
    }
    
    // Check if obj is an object
    if (typeof obj === 'object' && obj !== null) {
        // If obj is an array, iterate over its elements
        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                // Recursive call for each element in the array
                console.log('array found at : '+i)
                searchJSON(obj[i], searchKey, searchValue, results);
            }
        } else {
            // Iterate over object keys
            console.log('object keys found : ')
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    // If the key matches the searchKey and the value matches the searchValue, add to results
                    if (key === searchKey || obj[key] === searchValue) {
                        results.push(obj);
                    }
                    // Recursive call for each value in the object
                    searchJSON(obj[key], searchKey, searchValue, results);
                }
            }
        }
    }
    
    // Return results array
    return results;
}


