import styles from '../styles/footer.module.css'

export default function Footer() {
    return (
      <>
        <footer>
          <div className={styles.main}>
            <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
              <a className="flex title-font font-medium items-center md:justify-start justify-center text-black">
                <span className="ml-3 text-xl">THE 캠핑</span>
              </a>
              <p className="text-sm text-gray-800 sm:ml-6 sm:mt-0 mt-4">© 2023 Tailblocks —
               
              </p>
            </div>
          </div>
        </footer>
      </>
    )
  }
