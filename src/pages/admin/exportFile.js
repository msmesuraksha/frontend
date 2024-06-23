import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from "reactstrap";

const ExcelDownloader = () => {
    const downloadExcelFile = async () => {
        try {
            // Make API call to fetch Excel file
            const token = sessionStorage.getItem("tokenemployeeRegister");
            const config = {}

            const response = await fetch('https://bafana-backend.azurewebsites.net/api/admin/downloadAllDisputedTransactions', {
                method: 'GET',
                headers: {
                    ...config.headers,
                    'x-access-token': token,
                    // Add other necessary headers
                },
                responseType: 'blob', // Important
            });

            // Convert response to blob
            const blob = await response.blob();

            // Use FileSaver.js to save the blob as a file
            saveAs(blob, 'Disputed_Billing.xlsx');
        } catch (error) {
            console.error('Error downloading Excel file:', error);
        }
    };

    return (
        <div>
            <Button style={{ float: 'right' }} className="'btn bg-primary p-2 backtoDashButton" onClick={downloadExcelFile}>Download Excel File</Button>
        </div>
    );
};

export default ExcelDownloader;
