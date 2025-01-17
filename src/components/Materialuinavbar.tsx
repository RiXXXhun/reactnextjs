'use client';

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
import LanguageIcon from '@mui/icons-material/Language';
import BlindIcon from '@mui/icons-material/Blind';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import LogoDevIcon from '@mui/icons-material/LogoDev';

const pages = ['Kuponok', 'Ügyfélszolgálat', 'Rólunk'];
const settings = ['Profil', 'Belépés', 'Regisztráció', 'Kijelentkezés'];
const languages = ['English', 'Deutsch'];

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    color: theme.palette.warning.main,
  },
  '& .MuiSwitch-switchBase + .MuiSwitch-track': {
    backgroundColor: 'white',
  },
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.warning.main,
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.warning.main,
  },
}));

const label = { inputProps: { 'aria-label': 'Toggle switch' } };

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(null);
  const [checked, setChecked] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      console.log('Gyengénlátó mód bekapcsolva');
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1c2331', color: '#ecf0f1' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 80, md: 80, xl: 100 }, fontSize: { xl: 20 } }}>
          <LogoDevIcon sx={{ display: { xs: 'none', md: 'flex', xl: 'flex' }, mr: 1, fontSize: { xl: 40 } }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: { xl: 40, md: 25},
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
                  <Typography sx={{ textAlign: 'center', fontSize: { xl: 20 } }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <LogoDevIcon sx={{ display: { xs: 'flex', md: 'none', xl: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            }}
          >
            PLÁZAÁSZ
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontSize: { xl: 25, md: 20 }, mr: { xl: 2.5 } }}
              >
                {page}
              </Button>
            ))}
          </Box>
          

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Nyelvválasztó">
              <IconButton onClick={handleOpenLangMenu} sx={{ p: 0, mr: 2, fontSize: { xl: 20 } }}>
                <LanguageIcon sx={{ color: 'white', fontSize: { xl: 35 } }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-lang"
              anchorEl={anchorElLang}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElLang)}
              onClose={handleCloseLangMenu}
            >
              {languages.map((language) => (
                <MenuItem key={language} onClick={handleCloseLangMenu}>
                  <Typography sx={{ textAlign: 'center', fontSize: { xl: 20 } }}>{language}</Typography>
                </MenuItem>
              ))}
            </Menu>

            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid white', borderRadius: 1, height: 40, mr: 1 }}>
              <Tooltip title="Gyengénlátó mód">
                <IconButton sx={{ p: 0, mr: 2, ml: '10px', fontSize: { xl: 20 } }}>
                  {checked ? (
                    <BlindIcon sx={{ color: 'white', fontSize: { xl: 30 } }} />
                  ) : (
                    <RemoveRedEyeIcon sx={{ color: 'white', fontSize: { xl: 30 } }} />
                  )}
                </IconButton>
              </Tooltip>
              <CustomSwitch {...label} checked={checked} onChange={handleChange} />
            </Box>

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
                  <Typography sx={{ textAlign: 'center', fontSize: { xl: 20 } }}>{setting}</Typography>
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
