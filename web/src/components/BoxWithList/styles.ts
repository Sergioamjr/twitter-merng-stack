import styled from "styled-components";
import { colors, fontSizes } from "~theme";

export const Box = styled.div`
  background: #16181d;
  max-width: 348px;
  width: 100%;
  border-radius: 10px;
  height: auto;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const A = styled.a`
  color: ${colors.blue};
  text-decoration: none;
  padding: 16px;
  display: block;
`;

export const Title = styled.div<{ withBorder?: boolean }>`
  padding: 12px 16px;
  ${({ withBorder }) =>
    withBorder && "border-bottom: 1px solid rgb(47, 51, 54);"}
`;

export const Item = styled.li`
  padding: 12px 16px;
  cursor: not-allowed;
  .description {
    color: ${colors.lightLighten};
    color: #6E767D;
    font-size: ${fontSizes.extraSmall};
  }
  p {
    margin: 4px 0;
    font-weight: bold;
    color: ${colors.white};
  }
  border-bottom: 1px solid rgb(47, 51, 54)};
  &:hover {
    background: #1c1f24;
  }
  .with-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
