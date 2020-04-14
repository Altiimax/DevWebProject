<nav className='navbar'>
            <div className='container-fluid'>
                <div className='navbar-header'>
                    <a className="logo" href="/">
                        <img className="img-responsive logo" src={icon} alt="" data-logo-alt={icon} />
                    </a>
                    <a className='navbar-brand' href='/'>ToolBox</a>
                </div>
                <ul className='nav navbar-nav'>
                    <li className='active'><a href='/profile'>My profile</a></li>
                    <li><Button onClick={()=>{this.onOpenSignUp()}} variant="primary" >Sign-up</Button></li>
                    <li><Button onClick={()=>{this.onOpenSignIn()}} variant="primary" >Sign-in</Button></li>
                </ul>
            </div>
        </nav>