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

    const uploadUrl = `http://localhost:9001/hrdata/upload`

    const handleFileChange = (e) => {
        console.log('trying to select file')
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = async (e) => {
        e.preventDefault(); // Prevent form submission and page reload

        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }
        if(!selectedFile.name.endsWith(".xlsx") &&
         !selectedFile.name.endsWith(".xls")){
            alert("Please select an Excel file (.xlsx or .xls) to upload.")
            return
         }

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            await axios.post(uploadUrl,formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              
              onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setUploadProgress(progress);
              }
            }).then(
                response =>{
                    if (response.error) {
                      alert("Failed to upload file");
                      setSelectedFile(null)
                  } else {
                      alert("File uploaded successfully!");
                      setSelectedFile(null);
                      setFileUploadedSuccessfully(true)
                  }
                }
            )
            
            

            
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred while uploading the file.");
        }
    };

    return (
        <div
            className="bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div>
                <div className="flex items-center justify-center p-12">
                    { !fileUploadedSucessfully &&
                    <div className="mx-auto w-full max-w-[550px] bg-white">
                        <form className="py-6 px-9" onSubmit={handleUpload}>
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
