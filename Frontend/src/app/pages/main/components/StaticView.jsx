import React from 'react';
import ProductList from './ProductList';

import {
  movieData,
  schoolData,
  healthcareData,
  tourismData,
  militaryData,
  pornData,
  retailData,
  engineeringData,
  marketingData,
  realEstateData,
} from './StaticViewData';

const StaticView = () => (
  <div>

    <div className="row">
      <div className="off-md-1 col-xxs-12 col-md-4">
        <div className="image-container">
          <img src="/assets/images/business/movies.png" alt="Movies" />
        </div>
      </div>
      <div className="off-md-1 col-xxs-12 col-md-5">
        <div>
          <h4>Movies</h4>
          <p>Several movie maker and hollywood A-list directors already discovered the advantages of using VR in this industry. It enables its users to view a movie theater size screen in their very own living room. If the film is 360 degree, you can step into the movie and be part of it not just watch it. VR movies are able to take the audience's’ experience to a whole other level. However, owning a VR headset is in the extremely early adoption stage, partly because it’s expensive to buy.</p>
        </div>
      </div>
    </div>
    <ProductList data={movieData} />
    <hr />

    <div className="row reversed">
      <div className="off-md-1 col-xxs-12 col-md-4">
        <div className="image-container">
          <img src="/assets/images/business/school.png" alt="School" />
        </div>
      </div>
      <div className="off-md-1 col-xxs-12 col-md-5">
        <div>
          <h4>Schooling & Training</h4>
          <p>Many highly reputational people are talking about incorporating VR into the education system since a long time. The idea of using VR to take the students out of the classroom environment to drop them into an immersive world, where for example they can watch dinosaurs walking around them, experience a theatre performance or collaborate with students around the world are promising for the future of education. However most of the products are still in their explore and trial-phase and schools did not yet fully buy into VR because of barriers like a high price, the requirement of powerful phones for cheaper headsets and the clunkiness of the hardware in general . It remains to be seen which company will be the first to equip a large number of schools with their products.
          </p>
        </div>
      </div>
    </div>
    <ProductList reversed={true} data={schoolData} />
    <hr />

    <div className="row">
      <div className="off-md-1 col-xxs-12 col-md-4">
        <div className="image-container">
          <img src="/assets/images/business/healthcare.jpg" alt="healthcare" />
        </div>
      </div>
      <div className="off-md-1 col-xxs-12 col-md-5">
        <div>
          <h4>Healthcare</h4>
          <p>The importance of VR in healthcare lies in its ability to simulate medical situations, support surgeries and rehabilitation therapies. Thus far, VR technology has already changed the healthcare industry in a remarkable way. With this new technology, medical education, particularly in the area of simulation, training and modeling, can be immensely improved. Students are now able to immerse in experiences for advanced training practices. VR is playing a crucial role in professional skills training for minimally-invasive surgeries and operating room procedures. The technology continues to gain increased demand as a diagnostic tool in the healthcare sector in the form of fully immersive 3D simulation for patients in the treatment of phobias, autism, depression, anxiety and so on. The use of VR technology in the healthcare industry is already at an advanced stage.
          </p>
        </div>
      </div>
    </div>
    <ProductList data={healthcareData}/>
    <hr />

    <div className="row reversed">
      <div className="off-md-1 col-xxs-12 col-md-4">
        <div className="image-container">
          <img src="/assets/images/business/tourism.png" alt="tourism" />
        </div>
      </div>
      <div className="off-md-1 col-xxs-12 col-md-5">
        <div>
          <h4>Tourism</h4>
          <p>The usage of VR in the tourism industry is focused around the concept “try before you buy”. Most of the existing implementations are apps or websites offering 360 degree videos of holiday destinations so that the user can virtually inspect the destination, hotel rooms, attractions  before actually buying the trip. One solution that could innovate the existing landscape is called Sync Travel by KDDO Corp., which will offer real time inspection of the destination instead of watching pre-recorded 360 degree videos.
          </p>
        </div>
      </div>
    </div>
    <ProductList reversed={true} data={tourismData}/>
    <hr />

    <div className="row">
      <div className="off-md-1 col-xxs-12 col-md-4">
        <div className="image-container">
          <img src="/assets/images/business/military.png" alt="military" />
        </div>
      </div>
      <div className="off-md-1 col-xxs-12 col-md-5">
        <div>
          <h4>Military</h4>
          <p>The actual importance of VR in the military lies in its ability to prepare the soldiers for extremely dangerous situations without actually putting themselves in danger. War, or combat situation repetition with the help of a virtual reality simulation allows a soldier to learn how to react in appropriate manners befitting the circumstance. With the 360 degree visualisation and armed with the right military VR equipment, training scenes become lifelike. Typical examples are flight, vehicle, bootcamp or battlefield simulators. While the initial development of VR gear and software is expensive, in the long run it's much more cost effective than putting soldiers into real vehicles or physically simulated situations. In addition, the use of the VR technology attract young people to join the military. This is a big advantage for supporting and enlarging the military forces for our future.
          </p>
        </div>
      </div>
    </div>
    <ProductList data={militaryData}/>
    <hr />

    <div className="row reversed">
      <div className="off-md-1 col-xxs-12 col-md-4">
        <div className="image-container">
          <img src="/assets/images/business/porn.png" alt="Porn" />
        </div>
      </div>
      <div className="off-md-1 col-xxs-12 col-md-5">
        <div>
          <h4>Porn</h4>
          <p>The porn industry has been an early adopter of new technology time and time again, from the printing press to VHS and DVD. Virtual reality is just the latest technology star for the porn industry, putting the action on screens directly in front of our eyes. However, there are only very few male performers who can film virtual reality porn that is shot from a male point-of-view. In these shoots, the camera rig is typically placed within inches of the guy’s face, making it difficult to stay aroused. Moreover, users complain about the fear of getting caught while watching virtual reality porn because when wearing the head mounted displays they can’t hear or even see their surroundings. Though, it’s a totally new experience one might appreciate it for opening up brave new dimensions to their own sexuality and sensuality. Others, especially the partners of virtual reality porn users, could find it very disturbing due to the lifelike experience which creates a sense of cheating.
          </p>
        </div>
      </div>
    </div>
    <ProductList reversed={true} data={pornData} />
    <hr />

    <div className="row">
      <div className="off-md-1 col-xxs-12 col-md-4">
        <div className="image-container">
          <img src="/assets/images/business/retail.png" alt="Retail" />
        </div>
      </div>
      <div className="off-md-1 col-xxs-12 col-md-5">
        <div>
          <h4>Retail</h4>
          <p>There’s one big challenge to sustained growth of retailers: the deep-rooted desire to try before we buy. Not just seeing but holding, wearing and trying out are all key steps in the purchase process. This barrier has long been reflected in online “conversion rates” (the percentage of browsers who become buyers), which hover around 2%-4%, compared to rates of 20%-40% in brick-and-mortar retailers. One possible solution offers the usage of VR: more immersive E-commerce, cost savings for retail ( i.e.by testing in-store layouts) , big impact on selling products ( try before you buy). But besides a few existing solutions like the VR catwalk from Tommy Hilfiger, VR retail is still in an initial stage. but a very promising sector for VR usage.
          </p>
        </div>
      </div>
    </div>
    <ProductList data={retailData}/>
    <hr />

    <div className="row reversed">
      <div className="off-md-1 col-xxs-12 col-md-4">
        <div className="image-container">
          <img src="/assets/images/business/engineering.jpg" alt="Engineering" />
        </div>
      </div>
      <div className="off-md-1 col-xxs-12 col-md-5">
        <div>
          <h4>Engineering</h4>
          <p>The usage of VR in the engineering industry is already established  in some companies like Ford in forms of head mounted displays, virtual walls or CAVES and comes with a lot of advantages. Products or work environments are tested in VR, potentially with the end user, and problems are identified early in the design process. The number of expensive, physical models and prototypes can also be radically reduced in VR, which saves a lot of money and  increases product quality. However there are some challenges for quick adoption, namely software development for the visualization software, a high usage learning curve and the high price and space requirements of CAVE systems. Head mounted displays on the other hand are cheaper, but they still need haptics to provide a lot of the required interactivity. Motion sickness is another issue compared to using a CAVE system.
          </p>
        </div>
      </div>
    </div>
    <ProductList reversed={true} data={engineeringData}/>
    <hr />

    <div className="row">
      <div className="off-md-1 col-xxs-12 col-md-4">
        <div className="image-container">
          <img src="/assets/images/business/marketing.jpg" alt="marketing" />
        </div>
      </div>
      <div className="off-md-1 col-xxs-12 col-md-5">
        <div>
          <h4>Marketing</h4>
          <p>Virtual Reality Marketing is bringing about desired behavioral change in a set of people through reality emulation. The customer who experiences it would be able to immerse themselves into the environment where the product is located, in a virtual manner. They will be able to interact with the product and virtually experience it remotely from anywhere in the world. With this technology, companies are now able to tell a story about their products and invite their customers to experience the product before buying it. Still, owning a VR headset for consumer is in the extremely early adoption stage, partly because it’s expensive to buy. Additionally, the headsets are not a casual, everyday accessory that you can wear and play around with. While watching the content, you are fully committed to the headset, having no idea what is going on in your surroundings.
          </p>
        </div>
      </div>
    </div>
    <ProductList data={marketingData}/>
    <hr />

    <div className="row reversed">
      <div className="off-md-1 col-xxs-12 col-md-4">
        <div className="image-container">
          <img src="/assets/images/business/real_estate.png" alt="marketing" />
        </div>
      </div>
      <div className="off-md-1 col-xxs-12 col-md-5">
        <div>
          <h4>Real Estate</h4>
          <p>VR is an exciting new technology that allows the real estate industry the ability to tell a story like never before. VR technology is set to emerge as a powerful tool in selling property developments off-the-plan. It is a powerful tool to let others experience the finished product before construction ends, or even begins. Real estate agents are able to show the customers buildings, anywhere and anytime. This independence and the time saving aspect are crucial for busy business professionals, who are the main customers of a real estate agent.
          </p>
        </div>
      </div>
    </div>
    <ProductList reversed={true} data={realEstateData}/>

  </div>
);

export default StaticView;
