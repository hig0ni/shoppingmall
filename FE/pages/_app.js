import '../styles/globals.css'
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';

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