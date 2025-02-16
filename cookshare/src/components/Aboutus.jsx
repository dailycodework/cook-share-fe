import React from 'react'
import cover55 from "../assets/images/cover55.png"

const Aboutus = () => {
 return (
   <div className='about-us container mt-5'>
     <h2>About Us</h2>
     <p>
       Welcome to CookShare, your go-to platform for sharing and discovering
       delicious recipes from around the world. Our mission is to bring food
       lovers together by providing a space where everyone can share their
       culinary creations and find inspiration for their next meal.
     </p>
     {/* Banner Image */}
     <div className='banner'>
       <img
         src={cover55}
         alt='CookShare Banner'
         className='img-fluid'
         style={{ width: "100%", height: "auto", borderRadius: "8px" }}
       />
     </div>

     <h2>Our Mission</h2>
     <p>
       At CookShare, we believe that food is more than just sustenance; it's a
       way to connect with others, share cultures, and create lasting memories.
       We aim to foster a community where everyone can explore new flavors,
       learn from one another, and enjoy the art of cooking.
     </p>
     <h2>Meet Our Team</h2>
     <ul>
       <li>
         <strong>Jane Doe</strong> - Co-founder & Chef
         <p>
           Jane is a culinary expert with a passion for creating innovative
           recipes.
         </p>
       </li>
       <li>
         <strong>Simpson Alfred</strong> - Co-founder & Developer
         <p>
           John is a tech enthusiast dedicated to building a seamless user
           experience.
         </p>
       </li>
       <li>
         <strong>Emily Johnson</strong> - Community Manager
         <p>
           Emily loves connecting with users and fostering a vibrant CookShare
           community.
         </p>
       </li>
     </ul>
     <h2>Join Us</h2>
     <p>
       Whether you're a seasoned chef or a home cook, we invite you to join our
       community. Share your favorite recipes, discover new dishes, and connect
       with fellow food enthusiasts. Together, let's celebrate the joy of
       cooking!
     </p>
   </div>
 );
}

export default Aboutus
