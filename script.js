const outputdiv=document.getElementById("output");
const updateOutput=(message,isError=false)=>{
    const p=document.createElement('p');
    p.textContent=message;
    p.style.color=isError?'red':'black';
    outputdiv.appendChild(p);
};

const fakeApiCall=(id,duration,shouldFail=false)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(shouldFail){
                reject(new Error(`Failed to fetch data for item ${id}`));
            }
            else{
                resolve(`Data from Item ${id} fetched successfully after ${duration}ms.`);
            }
        },duration);
    });
};
// --- Sequential Fetching Logic ---
document.getElementById("seq").addEventListener('click',async ()=>{
    outputdiv.innerHTML= '<p>Fetching sequentially...</p>';
    try{
        const item1=await fakeApiCall(1,1000);
        updateOutput(item1);
        const item2=await fakeApiCall(2,500);
        updateOutput(item2);
        const item3=await fakeApiCall(3,800);
        updateOutput(item3);
        updateOutput('Sequential fetching complete!', false);

    }catch(error){
        updateOutput(`An error occurred: ${error.message}`, true);
    }
});
// --- Parallel Fetching Logic ---
document.getElementById("parallel").addEventListener('click',async ()=>{
    outputdiv.innerHTML= '<p>Fetching Parallely...</p>';
     // Promise.all() waits for all promises in the array to resolve
     const[item1,item2,item3]=await Promise.all([
        fakeApiCall(1,1000), // All start at the same time
        fakeApiCall(2,500),
        fakeApiCall(3,800),

     ]);
     updateOutput(item1);
     updateOutput(item2);
     updateOutput(item3);
});
// --- Error Handling Logic ---
document.getElementById("err").addEventListener('click',async ()=>{
    outputdiv.innerHTML='<p>Fetching with intentional error...</p>';
   try{
     // This will reject, triggering the catch block
    const res=await fakeApiCall(4,1000,true);
    updateOutput(res);
   }catch(error){
    updateOutput(`caught an error: ${error.message}`,true);
    updateOutput('Error handling successful!', false);
   }
});