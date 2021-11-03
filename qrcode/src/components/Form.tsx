import React from 'react';
import QRCode from 'qrcode.react';

import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';

import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

interface ImageSettings {
    src: string;
    x?: number | undefined;
    y?: number | undefined;
    height?: number | undefined;
    width?: number | undefined;
    excavate?: boolean | undefined;
}

interface BaseQRCodeProps {
	id: string;
    value: string;
    size?: number | undefined;
    renderAs?: "canvas" | "svg" | undefined;
    includeMargin?: boolean | undefined;
    bgColor?: string | undefined;
    fgColor?: string | undefined;
    level?: "L"|"M"|"Q"|"H" | undefined;
    imageSettings?: ImageSettings | undefined;
}

const counties = [
  { label: 'Cluj' },
  { label: 'Dolj'},
];

const vaccines = [
  { label: 'Johnson&Johnson' },
  { label: 'Moderna' },
  { label: 'Pfizer' },
];

const months = [
  { label: 'Ianuarie' },
  { label: 'Februarie' },
  { label: 'Martie' },
  { label: 'Aprilie' },
  { label: 'Mai' },
  { label: 'Iunie' },
  { label: 'Iulie' },
  { label: 'August' },
  { label: 'Septembrie' },
  { label: 'Octombrie' },
  { label: 'Noiembrie' },
  { label: 'Decembrie' },
];

const Form: React.FC = (): JSX.Element => {
	const [cnp, setCNP] = React.useState<string>("");
	const [serieci, setSerieCI] = React.useState<string>("");
	const [numarci, setNumarCI] = React.useState<string>("");
	const [name1, setName1] = React.useState<string>("");
	const [name2, setName2] = React.useState<string>("");
	const [vaccine, setVaccine] = React.useState<string>("");
	const [county, setCounty] = React.useState<string>("");
	const [month, setMonth] = React.useState<string>("");
	const [idn, setIDN] = React.useState<string>("");
	const [qrcode, setQRCode] = React.useState<any | undefined>();

	const onClick = (e: React.SyntheticEvent): void => {
	    e.preventDefault();
	    let qrString: string = '';
	    if (cnp !== null || serieci !== null || numarci !== null || name1 !== null || name2 !== null || vaccine !== null || county !==null || month !== null) {
	    	qrString += cnp + serieci + numarci + name1 + name2 + vaccine + county + month;
	    }
	    const hashDigest = sha256(qrString);
	    const hmacDigest: string = Base64.stringify(hmacSHA512(hashDigest, "hashKey"));
	    setIDN(hmacDigest);
	    setQRCode(
	      <QRCode 
	      	id="qrcode" 
	      	size={200} 
	      	value={`CNP: ${cnp} 
	      	\nSerieCI: ${serieci} 
	      	\nNumarCI: ${numarci} 
	      	\nNume: ${name1} 
	      	\nPrenume: ${name2} 
	      	\nVaccin: ${vaccine} 
	      	\nJudet: ${county} 
	      	\nLuna: ${month}
	      	\nHMAC512: ${idn.substring(0, 15)}`} 
	      	renderAs="svg" 
	      	bgColor="white" 
	      	fgColor="#141926" 
	      	level="H" 
	      />
	    );
	};

	return (
	<div className="main">
       <div className="card">
         <TextField
           id="outlined-basic"
           label="CNP:"
           variant="outlined"
           sx={{ m: 1, width: '25ch' }}
           onChange={e => setCNP(e.target.value)}
         />
          <TextField
           id="outlined-basic"
           label="Serie CI:"
           variant="outlined"
           sx={{ m: 1, width: '25ch' }}
           onChange={e => setSerieCI(e.target.value)}
         />

          <TextField
           id="outlined-basic"
           label="Numar CI:"
           variant="outlined"
           sx={{ m: 1, width: '25ch' }}
           onChange={e => setNumarCI(e.target.value)}
         />

          <TextField
           id="outlined-basic"
           label="Nume:"
           variant="outlined"
           sx={{ m: 1, width: '25ch' }}
           onChange={e => setName1(e.target.value)}
         />

          <TextField
           id="outlined-basic"
           label="Prenume:"
           variant="outlined"
           sx={{ m: 1, width: '25ch' }}
           onChange={e => setName2(e.target.value)}
         />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={vaccines}
            onChange={(e: React.SyntheticEvent, value: { label: string } | null ) => value ? setVaccine(value.label) : null}
            sx={{ m: 1, width: 300 }}
            renderInput={(params) => <TextField {...params} label="Tip vaccin:" />}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={counties}
            onChange={(e: React.SyntheticEvent, value: { label: string } | null ) => value ? setCounty(value.label) : null}
            sx={{ m: 1, width: 300 }}
            renderInput={(params) => <TextField {...params} label="Judet:" />}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={months}
            onChange={(e: React.SyntheticEvent, value: { label: string } | null ) => value ? setMonth(value.label) : null}
            sx={{ m: 1, width: 300 }}
            renderInput={(params) => <TextField {...params} label="Luna vaccin:" />}
          />
         <form className="form">
           <Button
             variant="contained"
             color="secondary"
             type="submit"
             value="Confirm"
             onClick={onClick}
           >
             Generate QR Code
           </Button>
           <br />
           <br />
         </form>
       </div>
       <div style={{marginTop: '10px'}}>{qrcode ? <div>{qrcode} <br/> <Typography variant="caption" gutterBottom component="div">HMAC512 Digest: { idn.substring(0, 15) }</Typography> </div> : <div></div>}</div>
     </div>
	);
};

export default Form;