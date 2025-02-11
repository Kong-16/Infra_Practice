import '../styles/layout.css';
import ReactSVG  from '../assets/react.svg?react';
import TypescriptSVG  from '../assets/typescript.svg?react';
import SpringbootSVG  from '../assets/springboot.svg?react';
import DataDogSVG  from '../assets/datadog.svg?react';
import ArgoSVG  from '../assets/argo.svg?react';
import JenkinsSVG  from '../assets/jenkins.svg?react';
import MySQLSVG  from '../assets/mysql.svg?react';
import GitlabSVG  from '../assets/gitlab.svg?react';

const Footer = () => {
  const Frameworks = () => (
    <div className="framework-container flex w-full">
      <div className="font-thin py-2 px-4 border-r-white border-r-2">
        FRAMEWORK
      </div>
      <div className="logo-container px-2 flex flex-grow justify-around">
        <ReactSVG className="icon" />
        <TypescriptSVG className="icon" />
        <SpringbootSVG className="icon" />
        <DataDogSVG className="icon" />
        <ArgoSVG className="icon" />
        <JenkinsSVG className="icon" />
        <MySQLSVG className="icon" />
        <GitlabSVG className="icon" />
      </div>
    </div>
  );

  return (
    <div className="footer-nav nav">
      <Frameworks />
    </div>
  );
};

export default Footer;
