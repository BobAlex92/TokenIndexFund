import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/landingpage.css';
import CryptoList from './crypto_list';
import TokenTransaction from "./TokenTransaction";

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [ethData, setEthData] = useState(null); // State for Ethereum data
  const [expanded, setExpanded] = useState(false); // State for expandable sections
  const [showModal, setShowModal] = useState(false);  // Modal state for Privacy Policy
  const [showTermsModal, setShowTermsModal] = useState(false); // Modal state for Terms of Service
  const [expandedFAQ, setExpandedFAQ] = useState(null); // State for FAQ

  // Toggle expanded sections
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Modal control functions
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openTermsModal = () => setShowTermsModal(true);
  const closeTermsModal = () => setShowTermsModal(false);

  // Toggle FAQ sections
  const toggleFAQ = (index) => setExpandedFAQ(expandedFAQ === index ? null : index);

  // Toggle menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Handle menu click
  const handleMenuClick = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  // Close modals with ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeModal();
        closeTermsModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Fetch Ethereum data from CoinGecko
  useEffect(() => {
    const fetchEthData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/ethereum'
        );
        setEthData(response.data);
      } catch (error) {
        console.error('Error fetching Ethereum data:', error);
      }
    };
    fetchEthData();
  }, []);

  return (
    
    <div className="landing-page-wrapper">
      {/* Navigation Menu */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            
          </div>
          <ul className="nav-links">
            <li><a href="#home" onClick={() => handleMenuClick('Home')}>Home</a></li>
            <li><a href="#cryptocurrencies" onClick={() => handleMenuClick('Cryptocurrencies')}>Cryptocurrencies</a></li>
            <li><a href="#portfolio" onClick={() => handleMenuClick('Portfolio')}>Portfolio</a></li>
            <li><a href="#how-it-works" onClick={() => handleMenuClick('How It Works')}>How It Works</a></li>
            
          </ul>

          {/* Mobile Menu */}
          <div className="mobile-menu">
            <div className="menu-header" onClick={toggleMenu}>
              <span>{currentPage}</span>
              <i className={`fas ${menuOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </div>
            {menuOpen && (
              <ul className="mobile-nav-links">
                <li><a href="#home" onClick={() => handleMenuClick('Home')}>Home</a></li>
                <li><a href="#cryptocurrencies" onClick={() => handleMenuClick('Cryptocurrencies')}>Cryptocurrencies</a></li>
                <li><a href="#portfolio" onClick={() => handleMenuClick('Portfolio')}>Portfolio</a></li>
                <li><a href="#how-it-works" onClick={() => handleMenuClick('How It Works')}>How It Works</a></li>
                
              </ul>
            )}
          </div>
        </div>
      </nav>

      {/* Full-page background with centered content */}
      <div className="content-container">
        <div className="centered-content">
          
          <h2>T.i.F</h2>
          <h4>Crypto Index Fund</h4>
          <p>Explore the <b>top cryptocurrencies,</b> monitor your <b>portfolio</b>, and stay updated with the latest news!</p>

          {/* Font Awesome Icons */}
          <div className="icon-container">
            <div className="icon">
              <i className="fa-brands fa-ethereum"></i>
              <p>Track Cryptos</p>
            </div>
            <div className="icon">
              <i className="fas fa-wallet"></i>
              <p>Portfolio</p>
            </div>
            <div className="icon">
              <i className="fas fa-chart-line"></i>
              <p>Market Trends</p>
            </div>
          </div>
        </div>
      </div>

    

 
      {ethData && (
        <div className="ethereum-details">

          <div className="eth-section">
            <h3>(ETH)Price</h3>
            <p>${ethData.market_data.current_price.usd.toLocaleString()}</p>
          </div>
          <div className="eth-section">
            <h3>(ETH)Market Cap</h3>
            <p>${ethData.market_data.market_cap.usd.toLocaleString()} Billion</p>
          </div>
          <div className="eth-section">
            <h3>(ETH)24h Volume</h3>
            <p>${ethData.market_data.total_volume.usd.toLocaleString()} Billion</p>
          </div>
          <div className="eth-section">
            <h3>(ETH)Circulating Supply</h3>
            <p>{ethData.market_data.circulating_supply.toLocaleString()} ETH</p>
          </div>

          
        </div>
       
      )}

       <div className="ethereum-details">
       
        </div>
        <div className="portfolio-section" id="portfolio">
        <h2>Portfolio</h2>
        <TokenTransaction /> {/* Added StakeTIF component */}
      </div>
        {/* Full-width container for CryptoList */}
      <div className="crypto-container" id='cryptocurrencies'>
        <CryptoList /> {/* Render the CryptoList component here */}
      </div>

{/* How It Works Section */}
<div className="how-it-works-section" id="how-it-works">
  <div className="how-it-works-container">
    <div className="how-it-works-item">
      <i className="fas fa-coins"></i>
      <h2>Select</h2>
      <p>Step 1: Choose your preferred cryptocurrencies to invest in.</p>
      <p>These assets form the foundation of your crypto portfolio.</p>
    </div>
    <div className="how-it-works-arrow">
      <i className="fas fa-arrow-right"></i>
    </div>
    <div className="how-it-works-item">
      <i className="fas fa-balance-scale"></i>
      <h2>Balance</h2>
      <p>Step 2: The index automatically balances your investments.</p>
      <p>This ensures your portfolio stays optimized without manual adjustments.</p>
    </div>
    <div className="how-it-works-arrow">
      <i className="fas fa-arrow-right"></i>
    </div>
    <div className="how-it-works-item">
      <i className="fas fa-chart-line"></i>
      <h2>Track</h2>
      <p>Step 3: Track your portfolio and performance over time.</p>
      <p>Monitor the growth of your investments and stay informed with real-time updates.</p>
    </div>
  </div>

  {/* Collapsible Section */}
  <div className="expandable-section">
    <button className="expand-button" onClick={toggleExpand}>
      {expanded ? 'Show Less' : 'Learn More'}
    </button>
    {expanded && (
      <div className="expanded-content">
        {/* Align each expanded section directly under its respective step */}
        <div className="expanded-item expanded-item-1">
          <div className="arrow-up">&#9650;</div> {/* Upward arrow */}
          <h3>Select - Further Information</h3>
          <h4>Why Selection Matters</h4>
          <p>Choosing the right cryptocurrencies is critical. Look for assets with strong use cases, market adoption, and long-term potential.</p>
        </div>
        <div className="expanded-item expanded-item-2">
          <div className="arrow-up">&#9650;</div> {/* Upward arrow */}
          <h3>Balance - Further Information</h3>
          <h4>Maintaining Balance</h4>
          <p>Regular rebalancing ensures that no single asset dominates your portfolio, reducing risk and optimizing performance.</p>
        </div>
        <div className="expanded-item expanded-item-3">
          <div className="arrow-up">&#9650;</div> {/* Upward arrow */}
          <h3>Track - Further Information</h3>
          <h4>Tracking Performance</h4>
          <p>Tracking your investments allows you to monitor key metrics and stay informed on market trends, volatility, and growth potential.</p>
        </div>
      </div>
    )}
  </div>
</div>

      <div className="faq-section" id='faq'>
      <h2>Frequently Asked Questions</h2>

      <div className="faq-item">
        <h3 onClick={() => toggleFAQ(1)}>
          What is a crypto index fund?
          <span className={`arrow ${expandedFAQ === 1 ? 'up' : 'down'}`}></span>
        </h3>
        {expandedFAQ === 1 && (
         <p>
  A <b>crypto index fund</b> is an <em>investment vehicle</em> that allows you to invest in a <strong>diversified portfolio of cryptocurrencies</strong>, 
  rather than buying individual coins. Just like traditional index funds that track the performance of <em>stocks or bonds</em>, 
  a crypto index fund tracks the <strong>performance</strong> of a selection of cryptocurrencies, 
  making it <em>easier for investors</em> to gain <strong>exposure to the broader crypto market</strong>.<br />
  This <b>diversification</b> reduces the <strong>risk</strong> associated with investing in any single cryptocurrency while still allowing you to 
  <em>participate in the market’s growth</em>.
</p>

        )}
      </div>

      <div className="faq-item">
        <h3 onClick={() => toggleFAQ(2)}>
          How does the T.I.F index fund work?
          <span className={`arrow ${expandedFAQ === 2 ? 'up' : 'down'}`}></span>
        </h3>
        {expandedFAQ === 2 && (
        <p>
  The <b>T.I.F (The Index Fund)</b> works by creating a <em>balanced portfolio</em> of <strong>top-performing cryptocurrencies</strong>. 
  The fund <strong>automatically adjusts</strong> the weight of each asset in the portfolio based on <em>market performance</em> and other <strong>key indicators</strong>. 
  This ensures that <strong>no single cryptocurrency dominates</strong> the fund, helping to <b>mitigate risk</b> while <em>maximizing potential returns</em>. 
  The T.I.F index fund <strong>regularly rebalances itself</strong> to maintain an <b>optimal mix</b> of cryptocurrencies, 
  giving you <strong>exposure to the broader crypto market</strong> without needing to <em>actively manage</em> your investments.
</p>

        )}
      </div>

      <div className="faq-item">
        <h3 onClick={() => toggleFAQ(3)}>
          What cryptocurrencies are included in the index?
          <span className={`arrow ${expandedFAQ === 3 ? 'up' : 'down'}`}></span>
        </h3>
        {expandedFAQ === 3 && (
         <p>
  The <b>T.I.F index</b> is composed of <strong>1,000 different coins</strong>, all built on the <em>Ethereum network</em>.<br /><br />
  This <em>diverse portfolio</em> is carefully curated by our team of <b>financial experts</b> to ensure a <strong>balanced mix</strong> of high-potential assets. <br />
  Each coin is selected based on factors like <b>market performance</b>, <strong>liquidity</strong>, and <em>long-term growth prospects</em> within the Ethereum ecosystem.<br /><br />
  By focusing on a wide range of <b>Ethereum-based tokens</b>, the T.I.F index provides <strong>exposure to a robust and innovative segment</strong> of the crypto market.
</p>

        )}
      </div>

      <div className="faq-item">
        <h3 onClick={() => toggleFAQ(4)}>
          How do I monitor my portfolio?
          <span className={`arrow ${expandedFAQ === 4 ? 'up' : 'down'}`}></span>
        </h3>
        {expandedFAQ === 4 && (
          <p>
            Monitoring your portfolio with T.I.F is simple. You can log in to your account and view your holdings at any time.
            T.I.F provides a user-friendly dashboard where you can see the performance of each cryptocurrency in the index, your overall portfolio value,
            and any changes to asset allocations. You’ll also have access to real-time data on market trends and portfolio performance,
            helping you stay informed and make better investment decisions.
          </p>
        )}
      </div>

      <div className="faq-item">
        <h3 onClick={() => toggleFAQ(5)}>
          What is the risk associated with investing in cryptocurrencies?
          <span className={`arrow ${expandedFAQ === 5 ? 'up' : 'down'}`}></span>
        </h3>
        {expandedFAQ === 5 && (
          <p>
            Investing in cryptocurrencies carries several risks. The crypto market is highly volatile, meaning prices can fluctuate dramatically
            in short periods. Additionally, regulatory uncertainty, security vulnerabilities, 
            and liquidity risks can also impact the value of your investments. While the T.I.F index fund helps reduce risk by diversifying
            across multiple cryptocurrencies, it's important to understand that the value of your portfolio can still rise and fall significantly. 
            Investors should only commit funds they are willing to risk and should consider crypto investments as part of a broader, diversified 
            investment strategy.
          </p>
        )}
      </div>
    </div>
           {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>About TiF</h4>
            <p>TiF (The Index Fund) is your trusted crypto index fund, providing a balanced portfolio to track the performance of the top cryptocurrencies.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#cryptocurrencies">Cryptocurrencies</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: info@tifcrypto.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 TiF - The Index Fund. All rights reserved. | <a href="#" onClick={openModal}>Privacy Policy</a> | <a href="#" onClick={openTermsModal}>Terms of Service</a></p>
        </div>
      </footer>

      {/* Modal for Privacy Policy */}
       {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Privacy Policy for The Index Fund (TiF)</h2>
            <p><strong>Effective Date:</strong> [Insert Date]</p>

            {/* Full Privacy Policy Content */}
            <h3>1. Information We Collect</h3>
            <p>We collect personal information that you provide directly to us, such as:</p>
            <ul>
              <li><strong>Contact Information:</strong> Your name, email address, phone number, and any other details you provide when you contact us.</li>
              <li><strong>Account Information:</strong> If you create an account with us, we may collect your login credentials and preferences.</li>
              <li><strong>Transaction Information:</strong> Details about your interactions with our platform, such as transaction history, portfolio data, and related activities.</li>
            </ul>
            <p>We may also collect information automatically when you use our website, including:</p>
            <ul>
              <li><strong>Cookies and Tracking Technologies:</strong> Information about your device, IP address, browser type, and interactions with our website.</li>
            </ul>

            <h3>2. How We Use Your Information</h3>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>To provide and maintain our services, including managing your account and processing transactions.</li>
              <li>To communicate with you, respond to inquiries, and provide updates.</li>
              <li>To personalize your experience and improve our services.</li>
              <li>To ensure the security of our platform and protect against fraud.</li>
            </ul>

            <h3>3. Sharing Your Information</h3>
            <p>We do not sell, rent, or trade your personal information. We may share your information with trusted third parties in the following situations:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third-party companies that help us operate our platform and provide services on our behalf.</li>
              <li><strong>Legal Compliance:</strong> When required by law, we may disclose your information in response to legal requests or to protect our rights.</li>
            </ul>

            <h3>4. Cookies and Tracking Technologies</h3>
            <p>Our website uses cookies to enhance your experience. You can control how cookies are used by adjusting your browser settings. Some features of our site may not function properly without cookies.</p>

            <h3>5. Data Security</h3>
            <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

            <h3>6. Your Rights</h3>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
              <li>The right to access, correct, or delete your personal information.</li>
              <li>The right to object to or restrict certain processing of your data.</li>
              <li>The right to withdraw consent for data processing at any time.</li>
            </ul>
            <p>If you would like to exercise these rights, please contact us at [Insert Email].</p>

            <h3>7. Changes to This Privacy Policy</h3>
            <p>We may update this Privacy Policy from time to time. When we do, we will revise the effective date at the top of this page. We encourage you to review this policy periodically.</p>

            <h3>8. Contact Us</h3>
            <p>If you have any questions or concerns about this Privacy Policy or how we handle your information, please contact us at:</p>
            <p>
              The Index Fund (TiF)<br />
              Email: info@tifcrypto.com<br />
              Phone: +1 (555) 123-4567
            </p>

            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
       {/* Modal for Terms of Service */}
      {showTermsModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Terms of Service for The Index Fund (TiF)</h2>
            <p><strong>Effective Date:</strong> [Insert Date]</p>
            
            <h3>1. Acceptance of Terms</h3>
            <p>By using the Site or Services, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy.</p>

            <h3>2. Eligibility</h3>
            <p>To use our Services, you must be at least 18 years of age or older and capable of entering into a legally binding contract.</p>

            <h3>3. Account Registration</h3>
            <p>You agree to provide accurate, complete, and up-to-date information when creating your account.</p>

            <h3>4. Use of Services</h3>
            <p>You agree to use the Services only for lawful purposes and in accordance with these Terms.</p>

            <h3>5. No Financial or Investment Advice</h3>
            <p>The information provided on the Site is for informational purposes only and does not constitute financial, investment, or legal advice.</p>

            <h3>6. Limitation of Liability</h3>
            <p>To the fullest extent permitted by law, TiF shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>

            <h3>7. Third-Party Links and Services</h3>
            <p>TiF has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.</p>

            <h3>8. Termination</h3>
            <p>We may suspend or terminate your access to the Services at any time, without notice, for any reason.</p>

            <h3>9. Changes to Terms</h3>
            <p>TiF reserves the right, in its sole discretion, to modify or update these Terms at any time.</p>

            <h3>10. Governing Law</h3>
            <p>These Terms shall be governed by and construed in accordance with the laws of [Insert Jurisdiction].</p>

            <h3>11. Contact Us</h3>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>
              The Index Fund (TiF)<br />
              Email: info@tifcrypto.com<br />
              Phone: +1 (555) 123-4567
            </p>

            <button className="close-button" onClick={closeTermsModal}>Close</button>
          </div>
        </div>
      )}
    </div>



  );
}

export default LandingPage;
