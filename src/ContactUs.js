import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';


const ContactUs = () => {
    const [countryCodes, setCountryCodes] = useState([]);


    const [languages, setLanguages] = useState([]);
    const [selectedLanguage1, setSelectedLanguage1] = useState('');
    const [selectedLanguage2, setSelectedLanguage2] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('');
    const [selectedRadio2, setSelectedRadio2] = useState('');
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);


    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                console.log('API Response:', response.data);

                const languageSet = new Set();
                response.data.forEach(country => {
                    if (country.languages) {
                        Object.values(country.languages).forEach(language => {
                            languageSet.add(language);
                        });
                    }
                });

                setLanguages(Array.from(languageSet));
            } catch (error) {
                console.error('Diller alınamadı:', error);
            }
        };
        fetchLanguages();
    }, []);
    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
    };
    useEffect(() => {
        const fetchCountryCodes = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const codes = response.data.map(country => {
                    const phoneCode = country.idd ?
                        (country.idd.root || '') + (country.idd.suffixes && country.idd.suffixes.length > 0 ? country.idd.suffixes[0] : '')
                        : '';
                    return {
                        code: country.cca2,
                        phoneCode: phoneCode,
                        name: country.name.common
                    };
                });
                setCountryCodes(codes);
            } catch (error) {
                console.error('Error fetching country codes:', error);
            }
        };

        fetchCountryCodes();
    }, []);
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Uploaded file:', file.name);
        }
    };

    const handleSubmit = () => {
        // Input checks
        if (!selectedLanguage1 || !selectedLanguage2 || !selectedRadio || !selectedRadio2) {
            alert('Please fill in all fields!');
            return;
        }

        // Log information
        console.log('Selected Language 1:', selectedLanguage1);
        console.log('Selected Language 2:', selectedLanguage2);
        console.log('Selected Translation Type:', selectedRadio);
        console.log('Selected Turnaround Time:', selectedRadio2);
    };

    return (
        <div className="containers">
            <h1 className="baslik-ana">Get In Touch With Us</h1>
            <div className="cizgi"></div>
            <p className='giris-yazi'>
                Welcome to Global Certified Translations! Your gateway to precise and efficient language solutions. Connect
                with us for tailored translation services,<br></br> ensuring your communication needs are met seamlessly. Get in
                touch today and experience the power of clear, accurate, and reliable language services!
            </p>
            <h1 className="baslik1">REQUEST A CERTIFIED TRANSLATION QUOTE</h1>
            <h2 className="baslik2">STEP 1: ENTER YOUR INFORMATION</h2>

            <div className="container">
                <div className="input-group">
                    <h1>Full Name*</h1>
                    <input className='company-input' type="text" placeholder="Enter Your Full Name" />
                </div>
                <div className="input-group">
                    <h1>Company Name</h1>
                    <input className='company-input' type="text" placeholder="Enter Your Company Name" />
                </div>
                <div className="input-group">
                    <h1>Email Address*</h1>
                    <input type="email" placeholder="Enter Your Email Address" />
                </div>
                <div className="input-group">
                    <h1>Phone Number*</h1>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="text" className="phoneinput" placeholder="Enter Your Phone Number" />
                        <select style={{ marginLeft: '-420px', top: '0px' }}>
                            {countryCodes.length > 0 ? (
                                countryCodes.map((country) => (
                                    <option key={country.code} value={country.phoneCode}>
                                        {country.name} ({country.phoneCode})
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading...</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>
            <br></br><br></br>
            <h2 className="baslik2">STEP 2: UPLOAD DOCUMENTS
            </h2>
            <p className='step2-p'>Click the Upload Files button below to securely upload your documents. We accept both scans and photographs of documents.
            </p>
            <div className="upload-container">


                <input
                    type="file"
                    style={{
                        marginTop: '10px',


                    }} aria-hidden="true"
                />
            </div>
            <h2 className="baslik2">STEP 3: SELECT LANGUAGE
                <div className='langues' style={{ display: 'flex', gap: '19px', marginTop: '80px' }}>

                    <select
                        value={selectedLanguage1}
                        onChange={(e) => setSelectedLanguage1(e.target.value)}
                        style={{ width: '600px', padding: '10px', fontSize: '16px', }}
                    >

                        <option value="">Select Language</option>
                        {languages.length > 0 ? (
                            languages.map((language, index) => (
                                <option key={index} value={language}>{language}</option>
                            ))
                        ) : (
                            <option value="">Loading</option>
                        )}
                    </select>

                    <select
                        value={selectedLanguage2}
                        onChange={(e) => setSelectedLanguage2(e.target.value)}
                        style={{ width: '600px', padding: '10px', fontSize: '16px' }}
                    >
                        <option value="">Select Language</option>
                        {languages.length > 0 ? (
                            languages.map((language, index) => (
                                <option key={index} value={language}>{language}</option>
                            ))
                        ) : (
                            <option value="">Yükleniyor...</option>
                        )}
                    </select>

                </div>
                <h2 className="typ">STEP 4: TRANSLATION TYPE

                </h2>
                <div className='radiogrup1' style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <label style={{ marginRight: '5px' }} className="custom-label">
                        <input type="radio" name="option" value="option1" onChange={(e) => setSelectedRadio(e.target.value)}
                        />
                        Certified Translation
                    </label>
                    <label className="custom-label">
                        <input type="radio" name="option" value="option2" onChange={(e) => setSelectedRadio(e.target.value)}
                        />
                        Business Translation
                    </label>
                </div>
                {selectedRadio && (
                    <p style={{ marginTop: '60px', fontSize: '15px', position: 'relative', left: '20px' }}>
                        {selectedRadio === 'option1' ? 'For USCIS, IRCC, immigration, government, or legal acceptance.' : 'For marketing, correspondence, manuals, and other business purposes.'}
                    </p>
                )}
                <h2 className="baslik2 baslik">STEP 5: TURNAROUND TIME</h2>
                <div className='radiogrup2' style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <label style={{ marginRight: '5px' }} className="custom-label">
                        <input type="radio" name="option1" value="option1" onChange={(e) => setSelectedRadio2(e.target.value)} />
                        Standard
                    </label>
                    <label className="custom-label">
                        <input type="radio" name="option1" value="option2" checked={selectedRadio2 === 'option2'} onChange={(e) => setSelectedRadio2(e.target.value)}
                        />
                        Expedited
                    </label>
                </div>
                {selectedRadio2 && (
                    <p style={{ marginTop: '60px', fontSize: '15px', position: 'relative', left: '20px' }}>
                        {selectedRadio2 === 'option1' ? 'Typically 24 hours for up to 2 pages, 48 hours for up to 4 pages.' : 'Your order will be prioritized and turnaround time reduced by up to 75%.'}
                    </p>
                )}



                <h2 className="addıtıonalsH1">ADDITIONALS
                </h2>
                <p className='addıtıonals'>Please use the field below to provide your translator with specific notes for your order. Include the correct spelling of names, addresses, locations, requests for first <br></br> person or third person, formal or informal, if currency conversions are required and any other important information necessary to accurately translate your <br></br>documents.</p>
                <div className="input-group detailes">
                    <h1>Additional Details</h1>
                    <textarea rows="9" placeholder="Enter your additional notes here" style={{ height: '79px' }}></textarea>
                </div>
            </h2 >

            <div className='checkbox-container' style={{}}>
                <label style={{ marginRight: '5px' }} className="custom-label">
                    <input type="checkbox" name="check" value="option1" />
                    Standard
                    <p className='checkp'>I would like a physical copy of this translation mailed upon completion.
                    </p>
                </label>
                <label className="custom-label">
                    <input type="checkbox" name="check" value="option2"
                    />
                    Expedited
                    <p className='checkp'>I would like this translation notarized.
                    </p>
                </label>
            </div>





            <button className='son' onClick={handleSubmit} style={{ marginTop: '20px' }}>Submit</button>


        </div >
    );
};

export default ContactUs;
