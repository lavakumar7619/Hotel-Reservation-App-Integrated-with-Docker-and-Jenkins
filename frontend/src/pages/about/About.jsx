import React from 'react'
import Navbar from "../../components/navbar/Navbar";
import Card from 'react-bootstrap/Card';
import {RxGithubLogo} from "react-icons/rx" 
import {AiFillLinkedin,AiFillInstagram,AiFillFacebook,AiOutlineMail} from "react-icons/ai"
import {MdOutlinePhoneInTalk} from "react-icons/md"
function About() {
  return (
    <div className="dark">
      <Navbar />
      <Card className="m-5 p-2 text-center text-30px">
        <Card.Header>Hotel Room booking</Card.Header>
        <Card.Body>
          <Card className="text-center text-30px">
            <Card.Body>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='p-2'>
          <Card.Subtitle className='m-2'>Author-Lava Kumar</Card.Subtitle>
          <Card.Text>
            Login With One time password (OTP).<br />
            Authentication  using JWT (Json Web Token).<br />
            Admin Have access to update the hotel description and rooms factors like price ,location etc.<br />
            Payment Integration through card.<br />
            Progress of Room available.<br />
            Admin can send Pop up Messages to users. <br /><hr />
          </Card.Text>
          <div>
            <Card.Subtitle className='p-2 mb-3'>Contact us</Card.Subtitle>
            <Card.Link href='https://github.com/'><RxGithubLogo/> Github</Card.Link>
            <Card.Link href='https://www.linkedin.com/in/lava-kumar-b054821b9/'><AiFillLinkedin/> Linkdein</Card.Link>
            <Card.Link href=''><AiFillInstagram/> Instagram</Card.Link>
            <Card.Link href=''><AiFillFacebook/> Facebook</Card.Link>
            <Card.Link ><AiOutlineMail/> lavakumar.kushi8197@gmail.com</Card.Link>
            <Card.Link disabled><MdOutlinePhoneInTalk/> +91 7619554450</Card.Link>
          </div>
          </Card>

        </Card.Body>
        <Card.Footer className="text-muted">@2023 Mtech Project</Card.Footer>
      </Card>
    </div>

  )
}

export default About