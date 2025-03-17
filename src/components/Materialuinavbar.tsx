"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import Link from 'next/link';

const pages = ['Rólunk']; 
const settings = ['Profil', 'Belépés', 'Regisztráció', 'Kijelentkezés'];


const label = { inputProps: { 'aria-label': 'Toggle switch' } };

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [checked, setChecked] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="static" sx={{ backgroundColor: '#1c2331', color: '#ecf0f1' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 80, md: 80, xl: 100 }, fontSize: { xl: 20 } }}>
        <Box
      component="img"
      src="/Logo.png"
      alt="Logo"
      sx={{
        display: { xs: 'none', md: 'flex', xl: 'flex' },
        mr: 1,
        width: 50,  
        height: 50, 
        maxWidth: '100%', 
      }}
    />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/homepage"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: { xl: 40, md: 25 },
            }}
          >
            PLÁZAÁSZ
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>



            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {page === 'Rólunk' ? (
                    <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography sx={{ textAlign: 'center', fontSize: { xl: 20 } }}>{page}</Typography>
                    </Link>
                  ) : (
                    <Typography sx={{ textAlign: 'center', fontSize: { xl: 20 } }}>{page}</Typography>
                  )}
                </MenuItem>
              ))}

              <MenuItem key="Kuponok" onClick={handleCloseNavMenu}>
                <Link href="/coupons" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography sx={{ textAlign: 'center', fontSize: { xl: 20 } }}>Kuponok</Typography>
                </Link>
              </MenuItem>


              <MenuItem key="Ügyfélszolgálat" onClick={handleCloseNavMenu}>
                <Link href="/support" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography sx={{ textAlign: 'center', fontSize: { xl: 20 } }}>Ügyfélszolgálat</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <Box
      component="img"
      src="/Logo.png"
      alt="Logo"
      sx={{
        display: { xs: 'flex', md: 'none', xl: 'none' },
        mr: 1,
        width: 40,  
        height: 40, 
        maxWidth: '100%', 
      }}
    />
          

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/homepage"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: { xl: 35 },
            }}>
            PLÁZAÁSZ
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontSize: { xl: 25, md: 20 }, mr: { xl: 2.5 } }}
              >
                {page === 'Rólunk' ? (
                  <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {page}
                  </Link>
                ) : (
                  page
                )}
              </Button>
            ))}


            <Button
              key="Kuponok"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block', fontSize: { xl: 25, md: 20 }, mr: { xl: 2.5 } }}
            >
              <Link href="/coupons" style={{ textDecoration: 'none', color: 'inherit' }}>
                Kuponok
              </Link>
            </Button>




            <Button
              key="Ügyfélszolgálat"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block', fontSize: { xl: 25, md: 20 }, mr: { xl: 2.5 } }}
            >
              <Link href="/support" style={{ textDecoration: 'none', color: 'inherit' }}>
                Ügyfélszolgálat
              </Link>
            </Button>
          </Box>


          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            

            <Tooltip title="Profil beállitások">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 0.5 }}>
                <Avatar alt="Remy Sharp" src="" sx={{ width: { xl: 50 }, height: { xl: 50 } }} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center', fontSize: { xl: 20 } }}>
                    {setting === 'Belépés' ? (
                      <Link href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>{setting}</Link> 
                    ) : setting === 'Regisztráció' ? (
                      <Link href="/registration" style={{ textDecoration: 'none', color: 'inherit' }}>{setting}</Link> 
                    ) : (
                      setting 
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
