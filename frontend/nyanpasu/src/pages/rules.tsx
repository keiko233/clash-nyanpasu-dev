import { Ref, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Virtualizer, VList } from "virtua";
import { BaseEmpty } from "@/components/base";
import RuleItem from "@/components/rules/rule-item";
import { alpha, FilledInputProps, TextField, useTheme } from "@mui/material";
import { useClashCore } from "@nyanpasu/interface";
import { BasePage, ScrollAreaViewport } from "@nyanpasu/ui";

export default function RulesPage() {
  const { t } = useTranslation();

  const { palette } = useTheme();

  const { getRules } = useClashCore();

  const [filterText, setFilterText] = useState("");

  const rules = useMemo(() => {
    return getRules.data?.rules.filter((each) =>
      each.payload.includes(filterText),
    );
  }, [getRules.data, filterText]);

  const inputProps: Partial<FilledInputProps> = {
    sx: {
      borderRadius: 7,
      backgroundColor: alpha(palette.primary.main, 0.1),

      fieldset: {
        border: "none",
      },
    },
  };

  const ref = useRef<HTMLDivElement>(null);

  const TAGS = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`,
  );

  return (
    <BasePage
      full
      title={t("Rules")}
      header={
        <TextField
          hiddenLabel
          autoComplete="off"
          spellCheck="false"
          value={filterText}
          placeholder={t("Filter conditions")}
          onChange={(e) => setFilterText(e.target.value)}
          className="!pb-0"
          sx={{ input: { py: 1, fontSize: 14 } }}
          InputProps={inputProps}
        />
      }
      noViewport
    >
      {/* <VList className="flex h-full select-text flex-col gap-2 overflow-auto p-2">
        {rules ? (
          rules.map((item, index) => {
            return <RuleItem key={index} index={index} value={item} />;
          })
        ) : (
          <BaseEmpty text="No Rules" />
        )}
      </VList> */}
      <ScrollAreaViewport ref={ref} className="relative h-full w-full">
        <Virtualizer scrollRef={ref}>
          {/* {rules?.map((item, index) => {
            return <RuleItem key={index} index={index} value={item} />;
          })} */}
          {/* {TAGS.map((tag) => (
            <div className="Tag" key={tag}>
              {tag}
            </div>
          ))} */}
        </Virtualizer>
      </ScrollAreaViewport>
    </BasePage>
  );
}
