import logo from "./00036.jpg";
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [predicted, setPredicted] = useState(null);
  const [isTimeOut, setIsTimeout] = useState(false);
  const [fileImage, setFileImage] = useState(
    "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
  );

  const labels = [
    "AM General Hummer SUV 2000",
    "Acura Integra Type R 2001",
    "Acura RL Sedan 2012",
    "Acura TL Sedan 2012",
    "Acura TL Type-S 2008",
    "Acura TSX Sedan 2012",
    "Acura ZDX Hatchback 2012",
    "Aston Martin V8 Vantage Convertible 2012",
    "Aston Martin V8 Vantage Coupe 2012",
    "Aston Martin Virage Convertible 2012",
    "Aston Martin Virage Coupe 2012",
    "Audi 100 Sedan 1994",
    "Audi 100 Wagon 1994",
    "Audi A5 Coupe 2012",
    "Audi R8 Coupe 2012",
    "Audi RS 4 Convertible 2008",
    "Audi S4 Sedan 2007",
    "Audi S4 Sedan 2012",
    "Audi S5 Convertible 2012",
    "Audi S5 Coupe 2012",
    "Audi S6 Sedan 2011",
    "Audi TT Hatchback 2011",
    "Audi TT RS Coupe 2012",
    "Audi TTS Coupe 2012",
    "Audi V8 Sedan 1994",
    "BMW 1 Series Convertible 2012",
    "BMW 1 Series Coupe 2012",
    "BMW 3 Series Sedan 2012",
    "BMW 3 Series Wagon 2012",
    "BMW 6 Series Convertible 2007",
    "BMW ActiveHybrid 5 Sedan 2012",
    "BMW M3 Coupe 2012",
    "BMW M5 Sedan 2010",
    "BMW M6 Convertible 2010",
    "BMW X3 SUV 2012",
    "BMW X5 SUV 2007",
    "BMW X6 SUV 2012",
    "BMW Z4 Convertible 2012",
    "Bentley Arnage Sedan 2009",
    "Bentley Continental Flying Spur Sedan 2007",
    "Bentley Continental GT Coupe 2007",
    "Bentley Continental GT Coupe 2012",
    "Bentley Continental Supersports Conv. Convertible 2012",
    "Bentley Mulsanne Sedan 2011",
    "Bugatti Veyron 16.4 Convertible 2009",
    "Bugatti Veyron 16.4 Coupe 2009",
    "Buick Enclave SUV 2012",
    "Buick Rainier SUV 2007",
    "Buick Regal GS 2012",
    "Buick Verano Sedan 2012",
    "Cadillac CTS-V Sedan 2012",
    "Cadillac Escalade EXT Crew Cab 2007",
    "Cadillac SRX SUV 2012",
    "Chevrolet Avalanche Crew Cab 2012",
    "Chevrolet Camaro Convertible 2012",
    "Chevrolet Cobalt SS 2010",
    "Chevrolet Corvette Convertible 2012",
    "Chevrolet Corvette Ron Fellows Edition Z06 2007",
    "Chevrolet Corvette ZR1 2012",
    "Chevrolet Express Cargo Van 2007",
    "Chevrolet Express Van 2007",
    "Chevrolet HHR SS 2010",
    "Chevrolet Impala Sedan 2007",
    "Chevrolet Malibu Hybrid Sedan 2010",
    "Chevrolet Malibu Sedan 2007",
    "Chevrolet Monte Carlo Coupe 2007",
    "Chevrolet Silverado 1500 Classic Extended Cab 2007",
    "Chevrolet Silverado 1500 Extended Cab 2012",
    "Chevrolet Silverado 1500 Hybrid Crew Cab 2012",
    "Chevrolet Silverado 1500 Regular Cab 2012",
    "Chevrolet Silverado 2500HD Regular Cab 2012",
    "Chevrolet Sonic Sedan 2012",
    "Chevrolet Tahoe Hybrid SUV 2012",
    "Chevrolet TrailBlazer SS 2009",
    "Chevrolet Traverse SUV 2012",
    "Chrysler 300 SRT-8 2010",
    "Chrysler Aspen SUV 2009",
    "Chrysler Crossfire Convertible 2008",
    "Chrysler PT Cruiser Convertible 2008",
    "Chrysler Sebring Convertible 2010",
    "Chrysler Town and Country Minivan 2012",
    "Daewoo Nubira Wagon 2002",
    "Dodge Caliber Wagon 2007",
    "Dodge Caliber Wagon 2012",
    "Dodge Caravan Minivan 1997",
    "Dodge Challenger SRT8 2011",
    "Dodge Charger SRT-8 2009",
    "Dodge Charger Sedan 2012",
    "Dodge Dakota Club Cab 2007",
    "Dodge Dakota Crew Cab 2010",
    "Dodge Durango SUV 2007",
    "Dodge Durango SUV 2012",
    "Dodge Journey SUV 2012",
    "Dodge Magnum Wagon 2008",
    "Dodge Ram Pickup 3500 Crew Cab 2010",
    "Dodge Ram Pickup 3500 Quad Cab 2009",
    "Dodge Sprinter Cargo Van 2009",
    "Eagle Talon Hatchback 1998",
    "FIAT 500 Abarth 2012",
    "FIAT 500 Convertible 2012",
    "Ferrari 458 Italia Convertible 2012",
    "Ferrari 458 Italia Coupe 2012",
    "Ferrari California Convertible 2012",
    "Ferrari FF Coupe 2012",
    "Fisker Karma Sedan 2012",
    "Ford E-Series Wagon Van 2012",
    "Ford Edge SUV 2012",
    "Ford Expedition EL SUV 2009",
    "Ford F-150 Regular Cab 2007",
    "Ford F-150 Regular Cab 2012",
    "Ford F-450 Super Duty Crew Cab 2012",
    "Ford Fiesta Sedan 2012",
    "Ford Focus Sedan 2007",
    "Ford Freestar Minivan 2007",
    "Ford GT Coupe 2006",
    "Ford Mustang Convertible 2007",
    "Ford Ranger SuperCab 2011",
    "GMC Acadia SUV 2012",
    "GMC Canyon Extended Cab 2012",
    "GMC Savana Van 2012",
    "GMC Terrain SUV 2012",
    "GMC Yukon Hybrid SUV 2012",
    "Geo Metro Convertible 1993",
    "HUMMER H2 SUT Crew Cab 2009",
    "HUMMER H3T Crew Cab 2010",
    "Honda Accord Coupe 2012",
    "Honda Accord Sedan 2012",
    "Honda Odyssey Minivan 2007",
    "Honda Odyssey Minivan 2012",
    "Hyundai Accent Sedan 2012",
    "Hyundai Azera Sedan 2012",
    "Hyundai Elantra Sedan 2007",
    "Hyundai Elantra Touring Hatchback 2012",
    "Hyundai Genesis Sedan 2012",
    "Hyundai Santa Fe SUV 2012",
    "Hyundai Sonata Hybrid Sedan 2012",
    "Hyundai Sonata Sedan 2012",
    "Hyundai Tucson SUV 2012",
    "Hyundai Veloster Hatchback 2012",
    "Hyundai Veracruz SUV 2012",
    "Infiniti G Coupe IPL 2012",
    "Infiniti QX56 SUV 2011",
    "Isuzu Ascender SUV 2008",
    "Jaguar XK XKR 2012",
    "Jeep Compass SUV 2012",
    "Jeep Grand Cherokee SUV 2012",
    "Jeep Liberty SUV 2012",
    "Jeep Patriot SUV 2012",
    "Jeep Wrangler SUV 2012",
    "Lamborghini Aventador Coupe 2012",
    "Lamborghini Diablo Coupe 2001",
    "Lamborghini Gallardo LP 570-4 Superleggera 2012",
    "Lamborghini Reventon Coupe 2008",
    "Land Rover LR2 SUV 2012",
    "Land Rover Range Rover SUV 2012",
    "Lincoln Town Car Sedan 2011",
    "MINI Cooper Roadster Convertible 2012",
    "Maybach Landaulet Convertible 2012",
    "Mazda Tribute SUV 2011",
    "McLaren MP4-12C Coupe 2012",
    "Mercedes-Benz 300-Class Convertible 1993",
    "Mercedes-Benz C-Class Sedan 2012",
    "Mercedes-Benz E-Class Sedan 2012",
    "Mercedes-Benz S-Class Sedan 2012",
    "Mercedes-Benz SL-Class Coupe 2009",
    "Mercedes-Benz Sprinter Van 2012",
    "Mitsubishi Lancer Sedan 2012",
    "Nissan 240SX Coupe 1998",
    "Nissan Juke Hatchback 2012",
    "Nissan Leaf Hatchback 2012",
    "Nissan NV Passenger Van 2012",
    "Plymouth Neon Coupe 1999",
    "Porsche Panamera Sedan 2012",
    "Ram C-V Cargo Van Minivan 2012",
    "Rolls-Royce Ghost Sedan 2012",
    "Rolls-Royce Phantom Drophead Coupe Convertible 2012",
    "Rolls-Royce Phantom Sedan 2012",
    "Scion xD Hatchback 2012",
    "Spyker C8 Convertible 2009",
    "Spyker C8 Coupe 2009",
    "Suzuki Aerio Sedan 2007",
    "Suzuki Kizashi Sedan 2012",
    "Suzuki SX4 Hatchback 2012",
    "Suzuki SX4 Sedan 2012",
    "Tesla Model S Sedan 2012",
    "Toyota 4Runner SUV 2012",
    "Toyota Camry Sedan 2012",
    "Toyota Corolla Sedan 2012",
    "Toyota Sequoia SUV 2012",
    "Volkswagen Beetle Hatchback 2012",
    "Volkswagen Golf Hatchback 1991",
    "Volkswagen Golf Hatchback 2012",
    "Volvo 240 Sedan 1993",
    "Volvo C30 Hatchback 2012",
    "Volvo XC90 SUV 2007",
    "smart fortwo Convertible 2012",
  ];
  const handleChange = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("fileName", e.target.files[0].name);

    setFileImage(URL.createObjectURL(e.target.files[0]));

    const config = {
      headers: {
        "Content-Type": "image/jpeg",
      },
    };
    axios.post("/predict", formData, config).then((response) => {
      setIsLoading(false);
      setTimeout(false);
      setPredicted(response.data.prediction);
    });
  };

  useEffect(() => {
    setTimeout(false);
    if (isLoading) {
      console.log("Started Timer");
      const timer = setTimeout(() => {
        setIsTimeout(true);
      }, 120000);
      return () => {
        console.log("clearing timer");
        clearTimeout(timer);
      };
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="hero min-h-full rounded-l-xl bg-base-200">
            <div className="hero-content py-12 flex-col">
              <img
                className="rounded h-40 w-90 border-primary object-cover"
                src={logo}
                alt="Car Disease Classification"
              />
              <h1 className="text-3xl text-center font-bold">
                Car Classification
              </h1>
              <a href="https://github.com/SVafadar69/EyeDiseaseClassification">
                <AiFillGithub className="inline mr-2" />
                SVafadar69/StandfordCarClassification
              </a>
              <div className=" text-left">
                <h2 className="text-xl font-bold py-3 ">
                  <a href="https://github.com/Rpyaanng">
                    <img
                      src="https://avatars.githubusercontent.com/u/25127243?v=4"
                      className="w-7 inline-block mr-2 mask mask-circle"
                      alt="dashwind-logo"
                    />
                    Ryan Pang
                  </a>
                </h2>
                <h2 className="text-xl font-bold">
                  <a href="https://github.com/SVafadar69">
                    <img
                      src="https://avatars.githubusercontent.com/u/100171698?v=4"
                      className="w-7 inline-block mr-2 mask mask-circle"
                      alt="dashwind-logo"
                    />
                    Steven Vafadar
                  </a>
                </h2>
              </div>

              <article className="prose">
                <h1>Introduction</h1>
                <p>
                  This project is a web application that classifies cars based
                  on their images. The model was trained on the Stanford Car
                  Dataset, which contains 16,185 images of 196 classes of cars.
                  The model was trained using a ResNet34 architecture, and
                  achieved an accuracy of 75.5% on the test set.
                </p>
                <h1>Dataset</h1>
                <p>
                  The Stanford Car Dataset contains 16,185 images of 196 classes
                  of cars. The dataset was split into 8,144 training images,
                  8,041 test images, and 8,041 validation images. The images
                  were taken from different angles and in different lighting
                  conditions. The dataset can be found{" "}
                  <a href="https://ai.stanford.edu/~jkrause/cars/car_dataset.html">
                    here
                  </a>
                </p>
              </article>
            </div>
          </div>
          <div className="hero min-h-full rounded-l-xl">
            <div className="hero-content flex-col">
              <h1 className="text-3xl text-center font-bold">
                {isLoading
                  ? isTimeOut
                    ? "The server seems like it's not responding. Please try refreshing."
                    : "This might take a minute..."
                  : "Upload an image of a car:"}
              </h1>
              <img
                className="rounded border-2 border-primary h-40 w-40"
                src={fileImage}
                alt=""
              />
              <div className="w-full p-4 items-center justify-center flex">
                <div className="form-control">
                  {isLoading ? (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-primary-600 to-pink-600 animate-spin">
                      <div className="h-9 w-9 rounded-full bg-base-100"></div>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="file-input file-input-bordered file-input-primary w-full max-w-xs object-cover"
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      <p
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        PNG, JPG or JPEG.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {predicted != null && (
                <>
                  <h1 className="text-2xl text-center font-bold pt-2 ">
                    Predicted:
                  </h1>
                  <h2 className="text-xl text-center font-bold">
                    {labels[predicted]}
                  </h2>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
