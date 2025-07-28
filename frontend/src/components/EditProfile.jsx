import React, { useContext, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { userDataContext } from "../context/UserContext";
import dp from "../assets/dp.png";
import { FiCamera, FiPlus } from "react-icons/fi";
import { Form } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";

const EditProfile = () => {
  const { edit, setEdit, userData, setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);

  const [firstName, setFirstName] = useState(userData.firstName || " ");
  const [lastName, setLastName] = useState(userData.lastName || " ");
  const [userName, setUserName] = useState(userData.userName || " ");
  const [headline, setHeadline] = useState(userData.headline || " ");
  const [location, setLocation] = useState(userData.location || " ");
  const [gender, setGender] = useState(userData.gender || " ");
  const [skills, setSkills] = useState(userData.skills || []);
  const [newSkills, setNewSkills] = useState("");
  const [education, setEducation] = useState(userData.education || []);
  const [newEducation, setNewEducation] = useState({
    college: "",
    degree: "",
    fieldOfStudy: "",
  });
  const [experience, setExperience] = useState(userData.experience || []);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    description: "",
  });
  const [frontendProfileImage, setFrontendProfileImage] = useState(
    userData.profileImage || dp
  );
  const [backendProfileImage, setBackendProfileImage] = useState(null);
  const [frontendCoverImage, setFrontendCoverImage] = useState(
    userData.coverImage || null
  );
  const [backendCoverImage, setBackendCoverImage] = useState(
    userData.profileImage || dp
  );

  const [saving, setSaving] = useState(false);
  const profileImage = useRef();
  const coverImage = useRef();

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkills && !skills.includes(newSkills)) {
      setSkills([...skills, newSkills]);
    }
    setNewSkills("");
  };

  const removeSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    }
  };

  const addEducation = (e) => {
    e.preventDefault();
    if (
      newEducation.college &&
      newEducation.degree &&
      newEducation.fieldOfStudy
    ) {
      setEducation([...education, newEducation]);
    }
    setNewEducation({
      college: "",
      degree: "",
      fieldOfStudy: "",
    });
  };

  const removeEducation = (edu) => {
    if (education.includes(edu)) {
      setEducation(education.filter((e) => e !== edu));
    }
  };

  const addExperience = (e) => {
    e.preventDefault();
    if (
      newExperience.title &&
      newExperience.company &&
      newExperience.description
    ) {
      setExperience([...experience, newExperience]);
    }
    setNewExperience({
      title: "",
      company: "",
      description: "",
    });
  };

  const removeExperience = (exp) => {
    if (experience.includes(exp)) {
      setExperience(experience.filter((e) => e !== exp));
    }
  };

  const handleProfileImage = (e) => {
    // e.preventDefault()
    const file = e.target.files[0];
    setBackendProfileImage(file);
    setFrontendProfileImage(URL.createObjectURL(file));
  };

  const handleCoverImage = (e) => {
    // e.preventDefault()
    const file = e.target.files[0];
    setBackendCoverImage(file);
    setFrontendCoverImage(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userName", userName);
      formData.append("headline", headline);
      formData.append("location", location);
      formData.append("gender", gender);
      formData.append("skills", JSON.stringify(skills));
      formData.append("education", JSON.stringify(education));
      formData.append("experience", JSON.stringify(experience));

      if (backendProfileImage) {
        formData.append("profileImage", backendProfileImage);
      }

      if (backendCoverImage) {
        formData.append("coverImage", backendCoverImage);
      }

      let result = await axios.put(
        serverUrl + "/api/user/updateprofile",
        formData,
        {
          withCredentials: true,
        }
      );
      setUserData(result.data);
      setSaving(false);
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
  };

  return (
    <div className="w-full h-[100vh] fixed top-0 z-[100] flex justify-center items-center">
      <input
        type="file"
        accept="image/*"
        hidden
        ref={profileImage}
        onChange={handleProfileImage}
      />

      <input
        type="file"
        accept="image/*"
        hidden
        ref={coverImage}
        onChange={handleCoverImage}
      />
      <div className="w-full h-full bg-black opacity-[0.5] absolute"> </div>

      <div className="w-[90%] max-w-[500px] h-[600px] bg-white relative z-[200] shadow-lg rounded-lg p-[10px] overflow-auto ">
        <div
          className="absolute top-[20px] right-[20px] cursor-pointer "
          onClick={() => setEdit(false)}
        >
          <RxCross1 className="w-[25px] h-[25px] text-gray-800 font-semibold cursor-pointer " />
        </div>

        <div
          className="w-full h-[150px] bg-gray-500 rounded-lg mt-[40px]  overflow-hidden cursor-pointer"
          onClick={() => coverImage.current.click()}
        >
          <img src={frontendCoverImage} alt="" className="w-full" />
          <FiCamera className="absolute right-[20px] top-[60px] w-[25px] h-[25px] text-white cursor-pointer " />
        </div>

        <div
          className="w-[80px] h-[80px] rounded-full overflow-hidden absolute top-[150px] ml-[20px]"
          onClick={() => profileImage.current.click()}
        >
          <img src={frontendProfileImage} alt="" className="w-full" />
        </div>
        <div className="w-[20px] h-[20px] bg-[#17c1ff] absolute top-[200px] left-[90px] rounded-full flex justify-center items-center cursor-pointer ">
          <FiPlus className="text-white" />
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-[20px] mt-[50px]">
          <input
            type="text"
            placeholder="firstName"
            className="w-full h-[50px] outline-none border-gra-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="lastName"
            className="w-full h-[50px] outline-none border-gra-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="userName"
            className="w-full h-[50px] outline-none border-gra-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Headline"
            className="w-full h-[50px] outline-none border-gra-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
          <input
            type="text"
            placeholder="location"
            className="w-full h-[50px] outline-none border-gra-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="gender (male, female , other)"
            className="w-full h-[50px] outline-none border-gra-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />

          {/* skills add  */}
          <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg ">
            <h1 className="text-[19px] font-semibold">Skills</h1>
            {skills && (
              <div className="flex flex-col gap-[10px]">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="w-full h-[40px] border-[1px] border-gray-600 bg-gray-200  rounded-lg p-[10px] flex justify-between items-center"
                  >
                    <span>{skill}</span>{" "}
                    <RxCross1
                      className="w-[20px] h-[20px] text-gray-800 font-semibold cursor-pointer "
                      onClick={() => removeSkill(skill)}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-[10px] items-start">
              <input
                type="text"
                placeholder="add new skills"
                value={newSkills}
                onChange={(e) => setNewSkills(e.target.value)}
                className="w-full h-[50px] outline-none border-gra-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />
              <button
                className="w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]"
                onClick={addSkill}
              >
                Add
              </button>
            </div>
          </div>

          {/* education  */}
          <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg ">
            <h1 className="text-[19px] font-semibold">Education</h1>
            {education && (
              <div className="flex flex-col gap-[10px]">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="w-full border-[1px] border-gray-600 bg-gray-200  rounded-lg p-[10px] flex justify-between items-center"
                  >
                    <span>
                      <div>
                        <div>college : {edu.college}</div>
                        <div>degree : {edu.degree}</div>
                        <div>Field of study : {edu.fieldOfStudy}</div>
                      </div>
                    </span>{" "}
                    <RxCross1
                      className="w-[20px] h-[20px] text-gray-800 font-semibold cursor-pointer "
                      onClick={() => removeEducation(edu)}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-[10px] items-start">
              <input
                type="text"
                placeholder="college"
                value={newEducation.college}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, college: e.target.value })
                }
                className="w-full h-[50px] outline-none border-gra-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />

              <input
                type="text"
                placeholder="degree"
                value={newEducation.degree}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, degree: e.target.value })
                }
                className="w-full h-[50px] outline-none border-gra-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />

              <input
                type="text"
                placeholder="field of study"
                value={newEducation.fieldOfStudy}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    fieldOfStudy: e.target.value,
                  })
                }
                className="w-full h-[50px] outline-none border-gra-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />
              <button
                className="w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]"
                onClick={addEducation}
              >
                Add
              </button>
            </div>
          </div>

          {/* experience */}
          <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg ">
            <h1 className="text-[19px] font-semibold">Experience</h1>
            {experience && (
              <div className="flex flex-col gap-[10px]">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="w-full border-[1px] border-gray-600 bg-gray-200  rounded-lg p-[10px] flex justify-between items-center"
                  >
                    <span>
                      <div>
                        <div>title : {exp.title}</div>
                        <div>company : {exp.company}</div>
                        <div>description : {exp.description}</div>
                      </div>
                    </span>{" "}
                    <RxCross1
                      className="w-[20px] h-[20px] text-gray-800 font-semibold cursor-pointer "
                      onClick={() => removeExperience(exp)}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-[10px] items-start">
              <input
                type="text"
                placeholder="title"
                value={newExperience.title}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, title: e.target.value })
                }
                className="w-full h-[50px] outline-none border-gra-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />

              <input
                type="text"
                placeholder="company"
                value={newExperience.company}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    company: e.target.value,
                  })
                }
                className="w-full h-[50px] outline-none border-gra-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />

              <input
                type="text"
                placeholder="description"
                value={newExperience.description}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    description: e.target.value,
                  })
                }
                className="w-full h-[50px] outline-none border-gra-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />
              <button
                className="w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]"
                onClick={addExperience}
              >
                Add
              </button>
            </div>
          </div>

          <button
            className="w-full h-11 sm:h-12 md:h-14 rounded-full bg-[#1dc9fd] text-white text-sm sm:text-base font-semibold mt-2 disabled:opacity-50" disabled={saving}
            onClick={() => handleSaveProfile()}
          >
            {saving ? "saving...":"save profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
