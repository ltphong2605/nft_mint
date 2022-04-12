import { useReactiveVar } from '@apollo/client'
import { Button, Col, Row, Image, Input } from 'antd'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DefaultPageTemplate } from './shared/templates/DefaultPageTemplate'
import { accountVar, chainIdVar, walletVar } from '../variables/WalletVariable'
import { mintErc721, getTotalMintedAmount,  getMintedAmount } from '../services/MintService'
import bgImage from '../assets/banner/banner.jpg'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { notifyError } from '../services/NotificationService'

export default function HomePage() {
  const chainId = useReactiveVar(chainIdVar)
  const account = useReactiveVar(accountVar)
  const wallettype = useReactiveVar(walletVar)
  const node = wallettype === 'walletconnect'? true : false

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [inputValues, setInputValues] = useState(1);
  const [totalMintedAmount, setTotalMintedAmount] = useState(0)
  const [mintedAmount, setMintedAmount] = useState(0)

  const images= [
    {
      name: 'Vynstad',
      role: 'Digital Creator',
      image: 'images/team/1_Vyndstad_ID.png'
    },
    {
      name: 'Siva',
      role: 'Copywriter',
      image: 'images/team/2_Siva_ID.png'
    },
    {
      name: 'Vlad',
      role: 'Developer',
      image: 'images/team/3_Vlad_ID.png'
    },
    {
      name: 'Xavier',
      role: 'Website Designer',
      image: 'images/team/4_Xavier_ID.png'
    },
    {
      name: 'Mango Monster',
      role: 'Discord Admin',
      image: 'images/team/5_Mango_ID.png'
    },
    {
      name: 'Babymochi',
      role: 'Promoter',
      image: 'images/team/6_Babymochi_ID.png'
    },
    {
      name: 'HAZ',
      role: 'Lazy Asshole',
      image: 'images/team/7_HAZ_id.png'
    }
  ]

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1440 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1440, min: 1280 },
      items: 4
    },
    protablet: {
      breakpoint: { max: 1280, min: 960 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 960, min: 600 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const mintNft = async () => {
    if(!account || !chainId) return;
    setIsLoading(true)
    await mintErc721(account, chainId, inputValues, node)
    setTotalMintedAmount(totalMintedAmount + inputValues)
    setIsLoading(false)
  }

  const setMintAmount = (amount) => {
    if(parseInt(amount) + mintedAmount > 3) {
      setInputValues(0)
      notifyError('You can mint 3 NFTs at maxium. You minted already' + mintedAmount + 'NFTs.');
      return;
    }
    setInputValues(amount)
  }

  useEffect(()=>{
    if(!chainId) return;
    if(!account) return;
    const getTotalMintedAmountNFT = async () => {
      let w_amount = await getTotalMintedAmount(chainId, node);      
      setTotalMintedAmount(w_amount)
    }
    const getMintedAmountNFT = async () => {
      let w_amount = await getMintedAmount(chainId, node, account);      
      setMintedAmount(w_amount)
    }
    getTotalMintedAmountNFT();
    getMintedAmountNFT()
  },[chainId, account])

  return (
    <>    
    <DefaultPageTemplate bgGray fullWidth noMargin> 
      <S.Banner  id="about">
      </S.Banner>
      <S.Intro>
        <Row justify='center'>
          <span className='title'>WELCOME TO 8BITFROGGERS</span>
        </Row>
        <Row justify='center'>
          <span className='desc'>"The duty of a leader is to serve their people, not for the people to serve them." - Elon Musk</span>
        </Row>
        <Row justify='center'>
          <a href='https://discord.com/invite/S8NRMqAH2F'><img alt='' src="icons/Discord_1.png" style={{width: '30px', height: '30px', margin: '10px 30px 10px 30px'}}></img></a>
          <a href='https://www.instagram.com/leaderinu'><img  alt='' src="icons/telegram.png" style={{width: '30px', height: '30px', margin: '10px 30px 10px 30px'}}></img></a>
          <a href='https://twitter.com/vyndstad'><img  alt='' src="icons/opensea.png" style={{width: '30px', height: '30px', margin: '10px 30px 10px 30px'}}></img></a>
        </Row>
      </S.Intro>
      <S.Mint id='mint'>
        <Row justify='center'>
          <span className='title'>MINT A 8BFROG NFT!</span>
        </Row>
        <Row justify='center'>
          <span className='desc'>Minting a 8BFROG NFT will automatically get you entered in to our lottery! Our lottery will be drawn at several stage to ensure we are 
            consistently giving out prizes as people continue to mint! These prizes will be paid immediately in the form of BNB. If you don't win on a lottery round, 
            keep holding, as you are eligible for all rounds once you mint!
          </span>
        </Row>
        <Row justify='center'>
          <span className='desc'>Hold on to your NFT even when all lottery drawings are completed. You will be able to use your NFT for staking in the future. When you 
          stake your NFT you will be rewarded with $LINU tokens. Our NFTs & NFT contract is also set up for P2E gaming and metaverse possibillities for when we get there!
          </span>
        </Row>
        <Row justify='center'>
          <span className='desc'>Enter how many 8BFROGs you would like to mint here ( Minium 1, Maxium 3 )
          </span>
        </Row>
        <Row justify='center'>
          <S.Input type='number' maxLength={'50'} value={inputValues} onChange={event => setMintAmount(event.target.value)}  /> 
            <span className='mintDesc' style={{marginLeft: '10px'}}>
              Total minted Items Ξ {totalMintedAmount} / 10000
            </span>
        </Row>
        <Row justify='center'>
          <span className='desc'>
            
          </span>
        </Row>
        <Row justify='center'>
          <S.Button loading={isLoading} onClick={mintNft}>Mint!</S.Button>
        </Row>
      </S.Mint>
      <S.Roadmap id='roadmap'>
        <Row justify='center'>
          <span className='title'>ROADMAP FOR TRUE 8BITFROGGERS</span>
        </Row>
        <Row>
          <div className="timeline">
            <div className="start"></div>
            <div className="container left">
              <div className="content">
                <Row justify='center'>
                  <h2 style={{fontFamily: 'LULO, cursive', fontWeight: 600}}>PHASE ONE</h2>
                </Row>
                <Row align='middle' style={{marginTop: '20px'}}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <p> - Stealth Launch</p>
                    <p> - TG / Twitter Marketing</p>
                    <p> - Create A Solid Floor</p>
                    <p> - Grow Holder Count</p>
                    <p> - Voting Sites</p>
                    <p> - Revamp Website</p>
                    <p> - Creation Of NFTs</p>
                    <p> - News Articles + Ads</p>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Image src="images/1.png" ></Image>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="container right">
              <div className="content">
                <Row justify='center'>
                  <h2 style={{fontFamily: 'LULO, cursive', fontWeight: 600}}>PHASE TWO</h2>
                </Row>
                <Row align='middle' style={{marginTop: '20px'}}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <p> - NFT Minting Live</p>
                    <p> - Marketing Push Token + NFTs</p>
                    <p> - CMC and CG Listed</p>
                    <p> - Push for 1200+ Holders</p>
                    <p> - Marketing Outside TG + Twitter</p>
                    <p> - More Ads, Articles, Voting Sites</p>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Image src="images/1.png" ></Image>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="container left">
              <div className="content">
                <Row justify='center'>
                  <h2 style={{fontFamily: 'LULO, cursive', fontWeight: 600}}>PHASE THREE</h2>
                </Row>
                <Row align='middle' style={{marginTop: '20px'}}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <p> - CMC Trending</p>
                    <p> - CG Trending</p>
                    <p> - Dext Trending</p>
                    <p> - Release V2 NFTs</p>
                    <p> - Release NFT Staking</p>
                    <p> - Release MetaVerse Usecase</p>
                    <p> - Form Major Partnerships</p>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Image src="images/1.png" ></Image>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="end"></div>
          </div>
        </Row>
      </S.Roadmap>
      <S.Whitepaper id="team">
        <Row justify='center'>
          <span className='title' style={{margin: '25px 0px 50px'}}>JOIN OUR TEAM!</span>
        </Row>
        <Row justify='center'>
          <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1500}
          keyBoardControl={true}
          customTransition="transform 800ms ease-in-out"
          transitionDuration={3000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={[]}
          renderButtonGroupOutside={false}
          deviceType={'desktop'}
          itemClass={"carousel-item-padding-20-px"}
        >
          {images.map((item,index) => {
            return  <div key={index}><Image
              src={item.image}
              alt={index + '_img'}
            />
            <div className="name">{item.name}</div>
            <div className="role">{item.role}</div>
            </div>
          })}
        </Carousel>
        </Row>
      </S.Whitepaper>
    </DefaultPageTemplate>
    </>
  )
}

export const S = {
  Banner: styled.div`
    width: 100%;
    height: 500px;
    background: url(${bgImage});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-bottom: 30px;
    @media (min-width: 300px) {
      height: 200px;
    }
    @media (min-width: 768px) {
      height: 350px;
    }
    @media (min-width: 1024px) {
      height: 500px;
    }
    @media (min-width: 1600px) {
      height: 600px;
    }
  `,  
  Intro: styled.div`
    border-bottom: 1px solid #ff9600;
    padding: 0px 10px;
    .title {
      color: #ff9600;
      font-size: 40px;
      font-weight: 900;
      font-family: Bungee;
      text-align: center;
    }
    .desc {
      color: ${props=>props.theme.gray[4]};
      font-size: 20px;
      text-align: center;
      margin: 20px 0px 10px 0px;
    }
    @media (min-width: 1024px) {
      padding: 0px 25px;
      .title {
        font-size: 60px;
      }
    }
  `,
  Mint: styled.div`
    margin-top: 60px;
    padding: 0px 10px;
    @media (min-width: 1024px) {
      padding: 0px 25px;
    }
    .title {
      color: #ba5a00;
      font-size: 40px;
      font-weight: 900;
      font-family: Bungee;
      text-align: center;
      margin-bottom: 40px;
    }
    .desc {
      color: ${props=>props.theme.gray[4]};
      font-size: 20px;
      text-align: center;
      margin: 20px 0px 30px 0px;
      width: 1100px;
    }
    .mintDesc {
      color: ${props=>props.theme.gray['4']};
      text-align: center;
      font-size: 14px;
      letter-spacing: 0.05em;
      margin: 5px;
      @media (min-width: 320px) {
        font-size: 14px;
        letter-spacing: 0.05em;
        margin: 10px 5px;
      }
      @media (min-width: 414px) {
        font-size: 15px;
        letter-spacing: 0.05em;
        margin: 10px 20px;
      }
      @media (min-width: 1024px) {
        font-size: 20px;
        letter-spacing: 0.05em;
        margin: 10px 20px;
      }
      @media (min-width: 1280px) {
        font-size: 20px;
        letter-spacing: 0.05em;
        margin: 10px 5px;
      }
    }
  `,
  Input: styled(Input) `
    border-radius: 8px;
    border: none;
    box-shadow: 1px 1px 5px hsl(0deg 0% 0% / 5%);
    color: ${(props)=>props.theme.gray['4']};
    background: ${(props)=>props.theme.gray['0']};
    border: 1px solid ${(props)=>props.theme.gray['2']};
    margin-right: 20px;
    @media (min-width: 320px) {
      width: 150px;
    }
    @media (min-width: 414px) {
      width: 200px;
    }
    @media (min-width: 768px) {
      width: 150px;
    }
    @media (min-width: 1024px) {
      width: 200px;
    }
  `,
  Button: styled(Button)`
    background: #ff9600;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    border: 1px solid #ff9600;
    border-radius: 20px !important;
    margin: 10px 10px;
    cursor: pointer !important;
    height: 40px;
    width: 300px;
    &:hover,
    &:active,
    &:focus {
      background-color: #ba5a00;
      color: #fff;
      border: 1px solid #ba5a00;
    }
  `,
  Roadmap: styled.div`
    margin-top: 80px;
    padding: 0px 10px;
    @media (min-width: 1024px) {
      padding: 0px 25px;
    }
    .title {
      color: #ff9600;
      font-size: 40px;
      font-weight: 900;
      font-family: Bungee;
      text-align: center;
      margin-bottom: 70px;
    }
    * {
      box-sizing: border-box;
    }
    .timeline {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
    }
    .timeline::after {
      content: '';
      position: absolute;
      width: 6px;
      background-color: #ba5a00;
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -3px;
    }
    .container {
      padding: 10px 40px;
      position: relative;
      background-color: inherit;
      width: 50%;
    }
    .container::after {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      right: -14px;
      background-color: #ff9600;
      border: 2px solid #ba5a00;
      top: 15px;
      border-radius: 50%;
      z-index: 1;
    }
    .left {
      left: 0;
    }
    .right {
      left: 50%;
    }
    .left::before {
      content: " ";
      height: 0;
      position: absolute;
      top: 22px;
      width: 0;
      z-index: 1;
      right: 30px;
      border: medium solid white;
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent #ff9600;
    }
    .right::before {
      content: " ";
      height: 0;
      position: absolute;
      top: 22px;
      width: 0;
      z-index: 1;
      left: 30px;
      border: medium solid white;
      border-width: 10px 10px 10px 0;
      border-color: transparent #ff9600 transparent transparent;
    }
    .right::after {
      left: -16px;
    }
    .content {
      padding: 20px 30px;
      background-color: white;
      position: relative;
      border-radius: 6px;
      border: 2px solid #ff9600;
    }
    .start {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: #ba5a00;
      left: 50%;
      border-radius: 50%;
      margin-left: -10px;
      margin-top: -19px;
    }
    .end {
      content: '';
      position: absolute;
      bottom: -10px;
      width: 20px;
      height: 20px;
      background-color: #ba5a00;
      left: 50%;
      border-radius: 50%;
      margin-left: -10px;
    }
    @media screen and (max-width: 600px) {
      /* Place the timelime to the left */
      .timeline::after {
        left: 31px;
      }
      .start {
        left: 31px;
      }
      .end {
        left: 31px;
      }
      /* Full-width containers */
      .container {
        width: 100%;
        padding-left: 70px;
        padding-right: 25px;
      }
      
      /* Make sure that all arrows are pointing leftwards */
      .container::before {
        left: 60px;
        border: medium solid white;
        border-width: 10px 10px 10px 0;
        border-color: transparent #ff9600 transparent transparent;
      }
    
      /* Make sure all circles are at the same spot */
      .left::after, .right::after {
        left: 15px;
      }
      
      /* Make all right containers behave like the left ones */
      .right {
        left: 0%;
      }
    }
  `,
  Whitepaper: styled.div`
    margin-top: 80px;
    padding: 0px 10px;
    @media (min-width: 1024px) {
      padding: 0px 25px;
    }
    .title {
      color: #ff9600;
      font-size: 40px;
      font-weight: 900;
      font-family: Bungee;
      text-align: center;
      margin-bottom: 10px;
    }
    .name {
      font-size: 20px;
      font-weight: 800;
      color: #fff;
      font-family: Play,sans-serif;
      text-align: center;
    }
    .role {
      font-size: 15px;
      font-weight: 400;
      color: #52A6BF;
      font-family: Play,sans-serif;
      margin-bottom: 2rem;
      text-align: center
    }
  `
}
