import React, { useState } from "react";
import "./receipeform.scss";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config.js";

const RecipeForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    steps: [],
  });
  const [image, setImage] = useState(null);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("image", image);
    for (const key in form) {
      if (key === "steps") {
        formData.append("steps", JSON.stringify(form[key]));
        continue;
      }
      formData.append(key, form[key]);
    }

    console.log(
      "🚀 ~ file: receipeform.jsx:20 ~ handleSave ~ formData:",
      formData.get("steps")
    );

    const response = await fetch(BASE_URL, {
      cache: "no-store",
      method: "POST",
      body: formData,
    }).then((response) => response.json());

    navigate("/");
    // const response = await fetch("http://localhost:3500/api/v1/", {
    //   method: "POST",
    //   body: formData,
    // } ).then(
    //   res => res.json()

    // ).catch(
    //   err => console.log(err)
    // )
    // console.log(response);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...form.steps];
    newSteps[index] = value;
    setForm({ ...form, steps: [...newSteps] });
  };

  const handleAddStep = () => {
    setForm({ ...form, steps: [...form.steps, ""] });
  };

  const handleRemoveStep = (index) => {
    const newSteps = [...form.steps];

    newSteps.splice(index, 1);
    setForm({ ...form, steps: [...newSteps] });
  };

  return (
    <div className="recipe-container">
      <div className="recipe-form">
        <div className="title">Create Recipe</div>
        <div className="input-container">
          <label htmlFor="title">Title: </label>
          <input
            name="text"
            type="text"
            placeholder="Enter title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="input-container">
          <label htmlFor="title">Title: </label>
          <textarea
            spellCheck="false"
            name="text"
            type="text"
            placeholder="Enter ingredients"
            value={form.ingredients}
            onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
          />
        </div>
        <div className="media">
          <label htmlFor="media">Media: </label>
          <div className="upload">
            {image && (
              <div className="uploaded-container">
                <img
                  onClick={() => setImage(null)}
                  className="uploadedimg"
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt="uploaded image"
                />
              </div>
            )}
            <button>
              <label
                style={{
                  cursor: "pointer",
                }}
                htmlFor="img"
              >
                Upload Image
              </label>
            </button>
            <input
              hidden
              type="file"
              name="img"
              id="img"
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => setImage(e.target.files[0])}
            />
            Accepts png, jpeg and webp.
          </div>
        </div>
        <div className="step-inputs">
          {form.steps.map((step, index) => (
            <div className="input-container step" key={index}>
              <input
                className="step-input"
                type="text"
                placeholder={`Step ${index + 1}`}
                value={form.steps[index]}
                onChange={(e) => handleStepChange(index, e.target.value)}
              />
              <button
                className="remove-step"
                onClick={() => handleRemoveStep(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="18"
                  viewBox="0 0 14 18"
                  fill="none"
                >
                  <path
                    d="M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          ))}
          <button className="add-step" onClick={handleAddStep}>
            Add Step
          </button>
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default RecipeForm;
