import React from 'react';
import withRouter from '@/routes/withRouter';
import loginBackground from '@/assets/images/demo/mindplex.jpg'

const ParticlesAuth = ({ children }) => {
    return (
        <React.Fragment>
            <div className="auth-page-wrapper pt-5">
                <div className="auth-one-bg-position" id="auth-particles" style={{backgroundImage:"url(" + loginBackground + ")", backgroundPosition: "center",backgroundSize: "cover"}}>
                    <div className="bg-overlay"></div>
                    <div className="shape">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                        </svg>
                    </div>
                </div>
                {/* pass the children */}
                {children}
            </div>
        </React.Fragment>
    );
};

export default withRouter(ParticlesAuth);