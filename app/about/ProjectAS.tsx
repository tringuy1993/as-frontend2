"use client";
// import { IntroImages } from "./Intro-Images";
import styles from "./styles.module.css";

export function PageProjectAS() {
  return (
    <>
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-2 text-35px font-semibold tracking-tight px-2">
          Project: Alpha-Seekers
        </span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <div className="text-35px">
        This project is the birth of my fullstack development. Dash plotly was
        good to visualize data and quickly deploy on Heroku. However, I quickly
        realized some drawbacks on my codes below:
        <ol className="text-25px text-justify list-decimal mx-36">
          <li>
            My plots cannot display semi-live data to multiple clients because
            the data API is directly fetched from the source. Additionally,
            there is a limit on # of requests from data API endpoint.
          </li>
          <li>
            My code structure quickly got out of hand with no organization and
            at times, it gets harder to debug.
          </li>
          <li>
            I do not know how Heroku works other than following some tutorial.
            In my opinion, it is beneficial to understand how Heroku works.
          </li>
        </ol>
        I deployed the following solutions below for each problem above:
        <ol className="text-25px text-justify list-decimal mx-36">
          <li>
            I utilize Django and Django RestFrameWork as my backend and server
            to create my own API endpoint. My API endpoint fetches and compute
            all the neccessary data continuously with crontab scheduler via
            Celery Beat. In this way, my frontend is more responsive without the
            need of computing data.
          </li>
          <li>
            I utilize React as my webframework to have better coding structures
            along with reusable components that I do not have to repeat myself.
          </li>
          <li>
            It urks me that I do not understand how Heroku works. I have a
            personal NAS and I found out that I can host my website on my NAS! I
            learned how to deploy my website{" "}
            <a href="www.alpha-seekers.com">Alpha-Seekers</a> on my virtual
            machine with Nginx (React) and Gunicorn (Django) via a linux server
            on my NAS.
          </li>
        </ol>
      </div>
    </>
  );
}
