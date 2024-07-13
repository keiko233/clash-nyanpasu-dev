import { IconButton, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { timing, useIPSB } from "@nyanpasu/interface";
import { useInterval } from "ahooks";
import { useRef, useState, useTransition } from "react";
import { countryCodeEmoji } from "country-code-emoji";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const HealthPanel = () => {
  const { t } = useTransition();

  const [health, setHealth] = useState({
    Google: 0,
    GitHub: 0,
    BingCN: 0,
    Baidu: 0,
  });

  const healthCache = useRef({
    Google: 0,
    GitHub: 0,
    BingCN: 0,
    Baidu: 0,
  });

  useInterval(async () => {
    setHealth(healthCache.current);

    healthCache.current = {
      Google: await timing.Google(),
      GitHub: await timing.GitHub(),
      BingCN: await timing.BingCN(),
      Baidu: await timing.Baidu(),
    };
  }, 1000);

  const { data } = useIPSB();

  const [showIPAddress, setShowIPAddress] = useState(false);

  return (
    <Grid sm={12} md={12} lg={6} xl={6} className="w-full">
      <Paper className="!rounded-3xl relative">
        <div className="p-4 flex justify-between">
          <div>
            {Object.entries(health).map(([name, value]) => {
              return (
                <div key={name} className="flex gap-1 justify-between">
                  <div className="min-w-20 font-bold">{name}:</div>
                  <div>{value.toFixed(0)} ms</div>
                </div>
              );
            })}
          </div>

          <div>
            {data && (
              // Object.entries(data).map(([key, value]) => {
              //   return (
              //     <div key={key}>
              //       {key}: {value}
              //     </div>
              //   );
              // })
              <div>
                <div className="flex gap-1 justify-between">
                  <div className="w-full flex gap-2 font-mono">
                    <span>{showIPAddress ? data.ip : "***.***.***.***"}</span>

                    <IconButton
                      className="!size-4"
                      onClick={() => setShowIPAddress(!showIPAddress)}
                    >
                      {showIPAddress ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </div>
                </div>
              </div>
            )}

            <div>{data && countryCodeEmoji(data?.country_code)}</div>
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default HealthPanel;
