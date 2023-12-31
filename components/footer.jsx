const Footer = ({name}) => {
    return ( 

<footer  className={`${name} bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600`}>
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#">Marty Mart™</a> | All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" className="mr-4 hover:text-emerald-400 md:mr-6">About</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:text-emerald-400 md:mr-6">Contact</a>
        </li>
        <li>
            <a href="#" className="hover:text-emerald-400">Privacy Policy</a>
        </li>
    </ul>
</footer>

     );
}
 
export default Footer;