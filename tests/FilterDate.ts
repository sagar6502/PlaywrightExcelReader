
    const URL = 'sc_task_list.do?sysparm_query=assignment_group%3De81fbe2adb132410f57064904b96193f%5Eshort_descriptionSTARTSWITHNew%20Hire%20-%20PLM%2FCAD%20Software%20needed%5Eactive%3Dfalse%5Evariables.4755eaf6db603010924cff0968961976BETWEENjavascript%3Ags.beginningOfToday()%40javascript%3Ags.dateGenerate(\'2024-02-15\'%2C\'end\')&sysparm_view=';
    const result = URL.match("[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}")[0];
    const sag = 'saggg'
    if(result === sag){
      console.log(500)
    }

    console.log('oldURL :: '+URL)
      // Get the current date
    const currentDate = new Date();

    // Add 4 days to the current date
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 4);

    // Extract year, month, and day components
    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(futureDate.getDate()).padStart(2, '0');

    // Create the desired pattern [YYYY-MM-DD] for the future date
    const formattedFutureDate = `${year}-${month}-${day}`;
    console.log();
    const newURL = URL.replace(result,formattedFutureDate)

    console.log('newURL :: '+newURL)