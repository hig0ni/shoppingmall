import '../styles/globals.css'
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; 
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
    
    return(
        <CookiesProvider>
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </CookiesProvider>
    );
}

export default MyApp