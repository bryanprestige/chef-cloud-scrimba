import chefIcon from '../assets/chef-icon.png'

export default function Header()  {
    return (
        <header >
            <img src={chefIcon} alt="chef-icon" className='chef-icon' />
            <h1>Chef Prestige</h1>
        </header>
    )
}