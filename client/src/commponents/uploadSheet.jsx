// import  { useState } from "react";

// const SendWelcomeMessage = () => {
//   const [emailList, setEmailList] = useState([]);

//   const addEmail = () => {
//     const emailInput = document.getElementById("email");
//     const email = emailInput.value.trim();

//     if (email !== "" && isValidEmail(email)) {
//       setEmailList((prevEmailList) => [...prevEmailList, email]);
//       emailInput.value = "";
//     } else {
//       alert("Please enter a valid email address.");
//     }
//   };

//   const displayEmailList = () => {
//     return emailList.map((email, index) => (
//       <li key={index}>{email}</li>
//     ));
//   };

//   const isValidEmail = (email) => {
//     // Regular expression for email validation
//     const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
//     // Test the email against the pattern
//     return emailPattern.test(email);
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (emailList.length === 0) {
//       alert("Please add at least one email address.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:9001/mail", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ to: emailList }),
//       });

//       if (response.ok) {
//         alert("Welcome message sent successfully!");
//         setEmailList([]); // Clear the email list
//       } else {
//         alert("Failed to send welcome message.");
//       }
//     } catch (error) {
//       console.error("Error sending welcome message:", error);
//       alert("Error sending welcome message. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h1>Send Welcome Message</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="email">Enter Email:</label>
//         <input type="email" id="email" name="email" required />
//         <button type="button" onClick={addEmail}>Add Email</button>
//         <button type="submit">Send Welcome Message</button>
//       </form>
//       <ul>{displayEmailList()}</ul>
//     </div>
//   );
// };

// export default SendWelcomeMessage;



import  { useState } from "react";
import background from '../../src/bg2.jpg';
import axios from "axios";
import GroupSelection from "./groupSelection";
import Success from "./common/success";



const UploadSheet = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileUploadedSucessfully, setFileUploadedSuccessfully] = useState(false)
    const [setupSuccessful, setSetupSuccessful] = useState(false)
    const [toEmail ,setToEmail]=useState("")
   
  const apiUrl = 'http://localhost:9001/mail';



    const uploadUrl = `http://localhost:9001/hrdata/upload`
    const handleUploadAndMailSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission and page reload
      
        // Check if email and file are filled
        if (!toEmail.trim()) {
          alert("Please enter your email ID.");
          return;
        }
      
        if (!selectedFile) {
          alert("Please select a file to upload.");
          return;
        }
      
        // Regular expression for email validation
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      
        if (!emailPattern.test(toEmail)) {
          alert("Please enter a valid email address.");
          return;
        }
      
        // Handle email submission
        try {
          const emailPayload = {
            to: [toEmail],
          };
      
          const emailResponse = await axios.post(apiUrl, emailPayload);
      
          // You can handle the email response here if needed
          console.log(emailResponse.data);
          alert("Mail delivered successfully!");
        } catch (error) {
          console.error("Error sending email:", error);
          alert("Failed to send email.");
        }
      
        // Handle file upload
        try {
          const formData = new FormData();
          formData.append("file", selectedFile);
      
          const fileResponse = await axios.post(uploadUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              setUploadProgress(progress);
            },
          });
      
          if (fileResponse.error) {
            alert("Failed to upload file");
            setSelectedFile(null);
          } else {
            alert("File uploaded successfully!");
            setSelectedFile(null);
            setFileUploadedSuccessfully(true);
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          alert("An error occurred while uploading the file.");
        }
      };
      
      // ...Rest of the component code...
      
    
      
    
    // const handleMailSubmit = async (e) => {
    //     e.preventDefault();
    //     if (toEmail.trim().length === 0) {
    //       alert("Please enter your email ID");
    //       return;
    //     }
      
    //     // Regular expression for email validation
    //     const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      
    //     if (!emailPattern.test(toEmail)) {
    //       alert("Please enter a valid email address.");
    //       return;
    //     }
      
    //     try {
    //       const payload = {
    //         to: [toEmail],
    //       };
      
    //       const response = await axios.post(apiUrl, payload);
      
    //       // You can handle the response here if needed
    //       console.log(response.data);
    //       alert('mail deliverd successfully')
    //     } catch (error) {
    //       console.error('Error sending email:', error);
    //     }
    //   };
      

    const handleFileChange = (e) => {
        console.log('trying to select file')
        const file = e.target.files[0];
        setSelectedFile(file);
    };



    // const handleUpload = async (e) => {
    //     e.preventDefault(); // Prevent form submission and page reload

    //     if (!selectedFile) {
    //         alert("Please select a file to upload.");
    //         return;
    //     }
    //     if (toEmail.length===0){
    //         alert("enter your email ID")
    //     }
    //     if(!selectedFile.name.endsWith(".xlsx") &&
    //      !selectedFile.name.endsWith(".xls")){
    //         alert("Please select an Excel file (.xlsx or .xls) to upload.")
    //         return
    //      }

    //     try {
    //         const formData = new FormData();
    //         formData.append("file", selectedFile);

    //         await axios.post(uploadUrl,formData, {
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //           },
              
    //           onUploadProgress: (progressEvent) => {
    //             const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
    //             setUploadProgress(progress);
    //           }
    //         }).then(
    //             response =>{
    //                 if (response.error) {
    //                   alert("Failed to upload file");
    //                   setSelectedFile(null)
    //               } else {
    //                   alert("File uploaded successfully!");
    //                   setSelectedFile(null);
    //                   setFileUploadedSuccessfully(true)
    //               }
    //             }
    //         )
            
            

            
    //     } catch (error) {
    //         console.error("Error uploading file:", error);
    //         alert("An error occurred while uploading the file.");
    //     }
    // };

    return (
        <div
            className="bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div>
                <div className="flex items-center justify-center p-12">
                    { !fileUploadedSucessfully &&
                    <div className="mx-auto w-full max-w-[550px] bg-white">
                        <form className="py-6 px-9" onSubmit={handleUploadAndMailSubmit}>
                        {/* <form className="py-6 px-9" onSubmit={(e) => { handleUpload(e); handleMailSubmit(e); }}> */}
                            <div className="mb-6 pt-4">
                                <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                                    Upload File
                                </label>
                                <div className="mb-8">
                                    <input
                                        name="file"
                                        id="file"
                                        type="file"
                                        onChange={handleFileChange}
                                        className="sr-only"
                                        accept=".xlsx, .xls"                        
                                    />
                                    <label
                                        htmlFor="file"
                                        className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                                    >
                                        <div>
                                            <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                                Drop files here
                                            </span>
                                            <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                                Or
                                            </span>
                                            <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                                Browse
                                            </span>
                                        </div>
                                    </label>
                                </div>
                                {!selectedFile ? null : (
                                    <div className="rounded-md bg-[#F5F7FB] py-4 px-8">
                                        <div className="flex items-center justify-between">
                                            <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                                                {selectedFile && selectedFile.name}
                                            </span>
                                            <button className="text-[#07074D]">
                                                <svg
                                                    width="10"
                                                    height="10"
                                                    viewBox="0 0 10 10"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    {/* SVG paths */}
                                                </svg>
                                            </button>
                                        </div>
                                        {uploadProgress === 0 ? null : (
                                            <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                                                <div
                                                    className="absolute left-0 right-0 h-full w-[75%] rounded-lg bg-[#6A64F1]"
                                                    style={{ width: `${uploadProgress}%` }}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div>
                                
                                <input type="email" placeholder="Enter your Email" value={toEmail} onChange={e=>(setToEmail(e.target.value))} className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D] mb-4"/>
                                                
                                            
                            </div>
                            
                            <div>
                                <button
                                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                    type="submit"
                                >
                                    Send File
                                </button>
                            </div>
                        </form>
                    </div>
                    }
                    {fileUploadedSucessfully && !setupSuccessful && <GroupSelection setSetupSuccessful={setSetupSuccessful}/>}
                    {fileUploadedSucessfully && setupSuccessful && <Success/>}
                </div>
            </div>
        </div>
    );
};

export default UploadSheet;
