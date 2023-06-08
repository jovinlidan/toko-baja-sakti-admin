import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";
import invariant from "invariant";
import * as React from "react";

export interface TimezoneStateProps {
  timeZone?: string;
  setTimezone?: (timeZone: string) => void;
}

export const TimezoneContext = React.createContext<TimezoneStateProps>({
  timeZone: "Asia/Jakarta",
  setTimezone: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function TimezoneContainer(props: Props) {
  const [renderChild, setRenderChild] = React.useState<boolean>(false);
  const [timeZone, setTimeZone] = React.useState<string | undefined>();

  const { children } = props;

  const value = React.useMemo<TimezoneStateProps>(
    () => ({
      timeZone,
      setTimezone: async (timeZone) => {
        try {
          await localStorage.setItem("timeZone", timeZone);
          setTimeZone(timeZone);
        } catch {}
      },
    }),
    [timeZone]
  );

  React.useEffect(() => {
    async function exec() {
      if (!timeZone) {
        // Get current timeZone from localStorage
        const selectedTimezone = await localStorage.getItem("timeZone");

        // Set to Asia/Jakarta if selectedTimezone doesn't exist
        setTimeZone(selectedTimezone || "Asia/Jakarta");
      }

      setRenderChild(true);
    }

    exec();
  }, [timeZone]);

  return (
    <TimezoneContext.Provider value={value}>
      {renderChild ? children : null}
    </TimezoneContext.Provider>
  );
}

type FormatType = "start-date" | "end-date";

interface TimezoneInterface {
  format: (
    date: Date | string | number,
    pattern: string,
    options?: any
  ) => string;
  convertTimeZone: (date: Date | string | number, type?: FormatType) => Date;
}

export function useTimezone(): TimezoneInterface {
  const context = React.useContext(TimezoneContext);

  const { timeZone } = context;

  invariant(
    context !== undefined,
    "useTimezone must be used inside Credential Container"
  );

  const modifiedFormat = React.useCallback(
    (date: Date | string | number, pattern: string, options?: any) => {
      const zonedDate = utcToZonedTime(date, timeZone!);

      return format(zonedDate, pattern, { timeZone, ...options });
    },
    [timeZone]
  );

  const convertTimeZone = React.useCallback(
    (date: Date | string | number, type?: FormatType) => {
      const newDate = zonedTimeToUtc(date, timeZone!);

      if (type) {
        switch (type) {
          case "start-date":
            newDate.setHours(0, 0, 0, 0);
            break;
          case "end-date":
            newDate.setHours(23, 59, 59, 59);
            break;
          default:
            break;
        }
      }

      return newDate;
    },
    [timeZone]
  );

  return {
    format: modifiedFormat,
    convertTimeZone,
  };
}
