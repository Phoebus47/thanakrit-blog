import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = styled("div")(() => ({
    position: "relative",
    borderRadius: "var(--border-radius, 8px)", // ค่า default 8px
    backgroundColor: "var(--color-neon-orange, rgba(255, 159, 0, 0.15))", // ใช้ Neon Orange
    boxShadow: "var(--shadow-neon-orange, 0px 0px 10px #ff9f00)", // เพิ่มเงา Neon Orange
    "&:hover": {
      backgroundColor: "var(--color-neon-orange, rgba(255, 159, 0, 0.25))", // Hover สีเข้มขึ้น
    },
    width: "100%",
  }));
  
  const SearchIconWrapper = styled("div")(() => ({
    padding: "0 16px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-neon-white, #ff9f00)", // เปลี่ยนสี Icon
  }));
  
  const StyledInput = styled(InputBase)(() => ({
    color: "var(--color-neon-white, #ff9f00)", // สีตัวอักษรเป็น Neon Orange
    textShadow: "var(--text-shadow-neon-orange, 1px 1px 3px #ff9f00)", // เงาข้อความ Neon
    width: "100%",
    "& .MuiInputBase-input": {
      padding: "8px 8px 8px 0",
      paddingLeft: "calc(1em + 32px)",
      transition: "width 0.3s ease",
      backgroundColor: "transparent",
      "&:focus": {
        width: "20ch",
      },
    },
  }));

export default function SearchBar() {
  return (
    <SearchContainer>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInput placeholder="Search…" inputProps={{ "aria-label": "search" }} />
    </SearchContainer>
  );
}