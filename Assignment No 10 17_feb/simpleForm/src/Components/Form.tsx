import { useState } from "react";

export const Form = () => {
  type FormDataType = {
    firstname: string;
    lastname: string;
    age: number;
    gender: string;
    skills: string;
    email: string;
    phoneNumber: number;
    address: string;
  };
  const [formData, setFormData] = useState<FormDataType>({
    firstname: "",
    lastname: "",
    age: 0,
    gender: "",
    skills: "",
    email: "",
    phoneNumber: 0,
    address: "",
  });

  type EventTargetType =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;
  const handleFormData = (e: EventTargetType) => {
    const { name } = e.target;
    const value =
      name === "age" || name === "phoneNumber"
        ? Number(e.target.value)
        : e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleValidations = (formData: FormDataType): [boolean, string] => {
    for (const [key, value] of Object.entries(formData)) {
      if (value.toString().trim().length === 0) {
        return [false, `Please fill ${key} field with proper information`];
      }
      if (key === "email" && !value.toString().includes("@")) {
        return [false, "Please enter a valid email"];
      }
      if (key === "phoneNumber" && value.toString().length !== 10) {
        return [false, "Please enter a valid 10-digit phone number"];
      }
      if (key === "gender" && value.toString() === "") {
        return [false, "Please select a valid gender"];
      }
      if (key === "skills" && value.toString() === "") {
        return [false, "Please select your suitable skills"];
      }
      if(key === 'age' && value.toString()[0]==='-'){
        return [false,'Age cannot be negative']
      }
    }
    return [true, ""];
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResp = handleValidations(formData);
    if (validationResp[0]) {
      alert("Form Submitted Successfully");
    } else {
      alert(`Form submit failed. Reason: ${validationResp[1]}`);
    }
  };
  const taiwindCssDiv = "grid g m-4";

  return (
    <>
      <div className=" mt-10  flex items-center justify-center">
        <form
          onSubmit={handleFormSubmit}
          className="w-2/5 h-3/5 border border-gray-400 rounded-lg p-2 grid grid-cols-2 font-serif"
        >
          <div className={taiwindCssDiv}>
            <label htmlFor="firstname">First Name:</label>
            <input
              className="w-3/4 h-8 border rounded-md border-gray-200 bg-gray-50"
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleFormData}
            />
          </div>
          <div className={taiwindCssDiv}>
            <label htmlFor="lastname">Last Name:</label>
            <input
              className="w-3/4 h-8 border rounded-md border-gray-200 bg-gray-50 "
              type="text"
              name="lastname"
              id="lastname"
              value={formData.lastname}
              onChange={handleFormData}
            />
          </div>
          <div className={taiwindCssDiv}>
            <label htmlFor="age">Age</label>
            <input
              className="border w-1/2 border border-gray-300 rounded-lg bg-gray-50"
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleFormData}
            />
          </div>
          <div className={taiwindCssDiv}>
            <label>Gender</label>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="male">Male</label>
              <input
                className="w-8 h-5"
                type="radio"
                name="gender"
                id="male"
                value="male"
                onChange={handleFormData}
              />
              <label htmlFor="female">Female</label>
              <input
                className="w-8 h-5"
                type="radio"
                name="gender"
                id="female"
                value="female"
                onChange={handleFormData}
              />
            </div>
          </div>
          <div className={taiwindCssDiv}>
            <label htmlFor="skills">Skills</label>
            <select
              className="border w-3/4 border-gray-300 bg-gray-50 rounded-lg"
              name="skills"
              id="skills"
              value={formData.skills}
              onChange={handleFormData}
            >
              <option value="" disabled>
                Select a skill
              </option>
              <option value="technical skills">Technical Skills</option>
              <option value="soft skills">Soft Skills</option>
              <option value="design skills">Design Skills</option>
            </select>
          </div>
          <div className={taiwindCssDiv}>
            <label htmlFor="email">Email</label>
            <input
              className="border w-3/4 border-gray-300 bg-gray-50 rounded-lg"
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleFormData}
            />
          </div>
          <div className={taiwindCssDiv}>
            <label htmlFor="phonenumber">Phone Number</label>
            <input
              className="border w-3/4 h-3/4 border-gray-300 bg-gray-50 rounded-lg"
              type="number"
              name="phoneNumber"
              id="phonenumber"
              value={formData.phoneNumber}
              onChange={handleFormData}
            />
          </div>
          <div className={taiwindCssDiv}>
            <label htmlFor="address">Address</label>
            <textarea
              className="border w-3/4 border-gray-300 bg-gray-50 rounded-lg"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleFormData}
            ></textarea>
          </div>
          <button
            className="col-span-full w-1/2  mx-auto bg-yellow-100 border rounded-lg cursor-pointer border-yellow-400"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
