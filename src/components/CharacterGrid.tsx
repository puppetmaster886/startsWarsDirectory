import React from "react";
import Grid from "@mui/material/Grid";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CharacterCard from "./CharacterCard";
import SkeletonCard from "./SkeletonCard";
import { Character } from "../interfaces/Character";
import { useMediaQuery, useTheme } from "@mui/material";

interface CharacterGridProps {
  characters: Character[];
  hasMore: boolean;
}

/**
 * CharacterGrid component
 * This component displays a grid of CharacterCards. If there are more characters to load,
 *  it fills the remaining grid items of the last line with SkeletonCards.
 * @param characters Array of Character objects
 * @param hasMore Boolean value indicating if there are more characters to load
 */
const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  hasMore,
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));

  const getColumns = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    return 4;
  };

  const columns = getColumns();
  const skeletonCount =
    characters.length % columns === 0
      ? 0
      : columns - (characters.length % columns);

  return (
    <Grid container spacing={3}>
      <TransitionGroup component={null}>
        {characters.map((character, index) => (
          <CSSTransition
            key={character.name}
            timeout={500}
            classNames="character"
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CharacterCard {...character} />
            </Grid>
          </CSSTransition>
        ))}
      </TransitionGroup>
      {hasMore &&
        Array.from(new Array(skeletonCount)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
            <SkeletonCard />
          </Grid>
        ))}
    </Grid>
  );
};

export default React.memo(CharacterGrid);
