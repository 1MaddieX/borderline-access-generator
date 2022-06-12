import { useEffect, useRef, useState } from 'react';
// import QR from 'qr-code-styling';
import { QRCodeCanvas } from 'qrcode.react';

import sea from 'gun/sea';
import random from 'lodash/random';

// style zone
const cardBase = {
  display: 'flex',
  justifyContent: 'center',
  margin: '1.5em',
  alignItems: 'center',
  overflow: 'hidden',
  width: '70vw',
  height: '32vw',
  backgroundColor: 'white',
  borderRadius: '30px',
};

const cardSection = {
  height: '100%',
  width: '50%',
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const glassPanel = {};

/*
const qrCode = new QR({
  margin: 5,
  qrOptions: {
    errorCorrectionLevel: 'H',
  },
  dotsOptions: {
    color: '#4267b2',
    type: 'rounded',
  },
});
*/

/** TODO:
 * generate a key/qr code
 * capture card as a png/pdf/etc. and let user print or share
 * allow user to login to their borderline namespace (user types in namespace name, ie "anarkitty" and their qr code is scanned to authenticate them with gun.
 *  styling information and other metadata about the user's namespace can be stored under a hashed entry. the data being hashed is the user's namespace).
 * allow user to add generated user to their namespace's allow list, along with the appropriate permissions
 */

export default function Card() {
  const qrRef = useRef();
  const dlRef: React.ElementRef<'canvas'> = useRef(null);
  const [key, setKey] = useState('');
  const [pin, setPin] = useState('');

  const handleKeyGen = async () => {
    const data = await sea.pair();
    // pin generator
    const pinTmp = Math.floor(100000 + Math.random() * 900000);
    const encData = await sea.encrypt(JSON.stringify(data), pinTmp.toString());
    console.log(pinTmp, encData);
    setPin(pinTmp.toString());
    setKey(JSON.stringify(encData));
  };

  const handleDownload = () => {
    // const { width, height } = dlRef.getBBox();

    // const clonedSvgElement = dlRef.cloneNode(true);
    /*
    const { outerHTML } = dlRef;
    const svgBlob = new Blob([outerHTML], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const dataUrl = URL.createObjectURL(svgBlob);
    */

    const code: HTMLCanvasElement = document.getElementById('hi');

    const dataUrl = code.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'borderline-login';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    /* qrCode.update({
      data: key,
    }); */
  }, [key]);

  useEffect(() => {
    // qrCode.append(qrRef.current);
    handleKeyGen();
  }, []);

  return (
    <div style={cardBase}>
      <div style={cardSection}>
        <button onClick={handleKeyGen} type="button">
          generate
        </button>
        <button onClick={handleDownload} type="button">
          download
        </button>
      </div>
      <div style={cardSection}>
        {/* <div ref={qrRef} /> */}
        {/* <div style={{ position: 'relative' }}> */}
        <QRCodeCanvas
          value={key}
          size={220}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin
          id="hi"
        />
        <span>{pin}</span>
        {/* </div> */}
      </div>
    </div>
  );
}
