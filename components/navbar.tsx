import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLocale } from "../hooks/locale";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaLanguage } from "react-icons/fa";
import { GiJapan } from "react-icons/gi";

export default function Navbar() {
  const { t } = useLocale();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleLocaleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLocaleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Toolbar variant="dense">
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Sugitlab.
        </Typography>
        <nav></nav>
        <IconButton edge="end" onClick={handleLocaleClick}>
          <FaLanguage />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleLocaleClose}
          onClick={handleLocaleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Link href={router.pathname} locale="ja" passHref>
              <a>Japanese</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href={router.pathname} locale="en" passHref>
              <a>English</a>
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </>
  );
}
