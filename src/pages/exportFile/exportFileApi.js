import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from "reactstrap";
import * as moment from "moment";

export const ExportFileApi = ({ selectMonth, dateSelect, url, fileName }) => {

    const newDate = dateSelect.map((value) => {
        return moment(value).format("YYYY-MM-DD")
    })





    const downloadExcelFile = async () => {
        try {
            // Make API call to fetch Excel file
            const token = sessionStorage.getItem("tokenemployeeRegister");
            const config = {}

            const response = await fetch(`https://msmesuraksha-backend.azurewebsites.net${url}`, {
                method: 'POST',
                headers: {
                    ...config.headers,
                    'x-access-token': token,
                    // Add other necessary headers
                }, body: JSON.stringify({
                    dateSelection: selectMonth,
                    startDate: newDate[0] ?? '',
                    endDate: newDate[1] ?? '',
                    roleBasedFilter: false
                }),
                responseType: 'blob', // Important
            },
            );

            // 

            // Convert response to blob
            const blob = await response.blob();

            // Use FileSaver.js to save the blob as a file
            saveAs(blob, `${fileName}.xlsx`);
        } catch (error) {
            console.error('Error downloading Excel file:', error);
        }
    };

    return (
        <div>
            <Button /* style={{ float: 'right' }} */ className="'btn bg-primary p-2 backtoDashButton mb-2" onClick={downloadExcelFile}>Download Excel File</Button>
        </div>
    );
};

