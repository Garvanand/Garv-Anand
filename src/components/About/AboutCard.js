import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Garv Anand </span>
            from <span className="purple"> Faridabad,Haryana.</span>
            <br />
            I’m a Computer Science undergraduate at Vellore Institute of Technology, specializing in Artificial Intelligence and Machine Learning
            <br />
            <br />
            Currently, I’m actively developing AI-powered solutions, 
            <br />
            - including an AI chatbot using PyTorch and NLTK, 
            
            <br />- An AI-generated text detector leveraging BERT models, 
            <br />
            - A Parkinson’s Detector utilizing speech analysis, <br />
            - as well as working upon a new approach for Speech Emotion Recognition.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Photography
            </li>
            <li className="about-activity">
              <ImPointRight /> Researching on new Technology
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
            <li className="about-activity">
              <ImPointRight /> Cooking
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build AI-powered solutions that solve real-world problems and leave a lasting impact."{" "}
          </p>
          <footer className="blockquote-footer">Garv</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
