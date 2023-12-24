import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { LuClipboardCopy } from "react-icons/lu";
import { RxReset } from "react-icons/rx";
import { RiLockPasswordFill } from "react-icons/ri";

function App() {
  const [length, setLength] = useState(20);
  const [numberallowed, setNumberAllowed] = useState(false);
  const [uppercharacterallowed, setUpperCharaterAllowed] = useState(true);
  const [lowercharaterallowed, setLowercharaterAllowed] = useState(false);
  const [symbolallowed, setSymboAllowed] = useState(false);
  const [password, Setpassword] = useState("");

  //ref for copy to clipboard
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";
    if (numberallowed) str += "0123456789";
    if (uppercharacterallowed) str += "ABCDEFGHIJKLMNOPQRSTUVWYZ";
    if (lowercharaterallowed) str += "abcdefghijklmnopqrstuvwyz";
    if (symbolallowed) str += "!£$%^&*()_-{}~@?/";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    Setpassword(pass);
  }, [
    length,
    numberallowed,
    uppercharacterallowed,
    symbolallowed,
    lowercharaterallowed,
    Setpassword,
  ]);

  const copypasswordtoclipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 71);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [
    length,
    numberallowed,
    lowercharaterallowed,
    uppercharacterallowed,
    symbolallowed,
    passwordGenerator,
  ]);

  const handleInputchange = (e) => {
    Setpassword(e.target.value);
  };
  const handlerefreshclick = () => {
    Setpassword("");
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#000821] h-screen w-full">
      <div className="bg-[#050b1b] relative mx-auto mt-[70px] sm:w-[300px] md:w-[600px] lg:w-[800px] xl:w-[700px] h-[600px] md:h-[600px] rounded-[25px] shadow-2xl shadow-slate-800 flex flex-col items-center">
        <h1 className="text-white text-xl inline-flex gap-2 p-4 mt-2">
          <RiLockPasswordFill color="orange" size={"25px"} />
          Password Generator
        </h1>
        <div className="bg-[#050b1b] flex justify-center items-center p-2 m-2 px-4 border-solid border-2 border-white-200 space-x-8 rounded-2xl">
          <input
            onChange={handleInputchange}
            className="text-white sm:text-xl m-2 font-normal bg-[#050b1b] w-[100px] md:w-[300px] lg:w-[400px] text-start outline-none"
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copypasswordtoclipboard}
            className="text-white hover:text-[#FFA500] hover:focus-within:cursor-pointer hover:focus-within:outline-slate-700 h-full p-[4px]"
          >
            <LuClipboardCopy
              size={"24px"}
              fontSize={"200px"}
              fontStyle={"extrabold"}
            />
          </button>
        </div>

        <div className="flex flex-col ">
          <div className="flex items-center justify-between mt-2 p-4">
            <label className="text-white text-md font-semibold" htmlFor="">
              Password Length <span className="text-[#4671e6]"> | </span>{" "}
              {length}
            </label>
            <button
              onClick={handlerefreshclick}
              className="text-white inline-flex gap-2 font-md hover:bg-[#253f86] rounded-md bg-[#011c7a] px-3 py-2 text-md font-semibold shadow-sm"
            >
              RESET
              <RxReset size={"20px"} fontStyle={"bold"} />
            </button>
          </div>
          <input
            min={20}
            value={length}
            max={70}
            onChange={(e) => {
              setLength(e.target.value);
            }}
            className=" cursor-pointer p-2 m-2 w-[250px] md:w-[450px] text-[#011c7a] lg:w-[400px] focus:ring-[#011c7a] focus:border-[#011c7a] border-gray-300 focus:outline-none"
            type="range"
            color="#011c7a"
          />
        </div>

        <div className="w-[200px] md:w-[300px] lg:w-[400px] pt-6 ">
          <div className="flex flex-col gap-4 sm:gap-2 md:gap-12 lg:gap-4">
            {/* Upper case */}
            <div className="flex items-center justify-between text-md font-medium text-white">
              <label className="text-md font-medium" htmlFor="Uppercase">
                UpperCase (A-Z)
              </label>
              <input
                className="h-12 w-5 cursor-pointer bg-[#011c7a]"
                style={{ color: "#011c7a" }}
                color="#011c7a"
                type="checkbox"
                defaultChecked={uppercharacterallowed}
                onChange={(e) => {
                  setUpperCharaterAllowed((prev) => !prev);
                }}
              />
            </div>

            {/* Lower case */}
            <div className="flex items-center justify-between text-md font-medium text-white">
              <label className="text-md font-medium" htmlFor="Lowercase">
                LowerCase (a-z)
              </label>
              <input
                className="h-12 w-5 cursor-pointer"
                type="checkbox"
                defaultChecked={lowercharaterallowed}
                onChange={(e) => {
                  setLowercharaterAllowed((prev) => !prev);
                }}
              />
            </div>

            {/* Symbol case */}
            <div className="flex items-center justify-between text-md font-medium text-white">
              <label className="text-md font-medium" htmlFor="Symbol">
                Symbol (!£$%^&*()_-{}~@?/)
              </label>
              <input
                className="h-12 w-5 cursor-pointer"
                type="checkbox"
                defaultChecked={symbolallowed}
                onChange={(e) => {
                  setSymboAllowed((prev) => !prev);
                }}
              />
            </div>

            {/* Number case */}
            <div className="flex items-center justify-between text-md font-medium text-white">
              <label className="text-md font-medium" htmlFor="Number">
                Number (0-9)
              </label>
              <input
                className="h-12 w-5 cursor-pointer"
                type="checkbox"
                defaultChecked={numberallowed}
                onChange={(e) => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
            </div>
          </div>
        </div>

        {/*designer by me  */}
      </div>

      <div className=" sm:gap-2  md:gap-12 lg:gap-4 p-6 ">
        <h1 className="text-white">
          Designed by <span style={{ color: "#FFA500" }}>@Mahapara</span>
        </h1>
      </div>
    </div>
  );
}

export default App;
