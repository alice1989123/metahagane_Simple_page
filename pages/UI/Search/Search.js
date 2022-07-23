import { BsSearch } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';

const Search = props => {
    const onChange = (value) => {
        props.onSearch(value);
    }
    return (
        <div className='flex items-center gap-4 bg-primary w-full px-4 py-2 rounded-lg shadow-button dark:shadow-button-dark dark:bg-gray'>
            <div className='flex items-center justify-center rounded-full shadow-button-icon px-2 py-2  dark:shadow-button-icon-dark'>
                <BsSearch />
            </div>
            <input type="text" placeholder='Search' className='bg-transparent outline-none w-full' onChange={(e) => onChange(e.target.value)} value={props.search}/>
            {props.search ?
                <div className='cursor-pointer' onClick={() => onChange('')}>
                    <IoClose />
                </div>
                : null}
        </div>
    )
}

export default Search;