library(readxl)
library(tidyverse)

global_mortality <- readxl::read_excel("tidytuesday/data/global_mortality.xlsx")

global_mortality <- janitor::clean_names(global_mortality)

global_mortality <- mutate_at(global_mortality, vars(contains("percent")), ~round(., 3))

names(global_mortality) <- stringr::str_remove_all(names(global_mortality), "_percent")

global_mortality <- global_mortality %>% 
  gather(cause_of_death, percent, 
         cardiovascular_diseases:terrorism, 
         -country, -country_code, -year)

usa_drugs <- global_mortality %>% 
  filter(country == "United States",
         cause_of_death == "drug_disorders") %>% 
  select(year, percent) 

write_csv(global_mortality, "tidyTuesdaysD3/data/global_mortality_cleaned.csv")
write_csv(usa_drugs, "tidyTuesdaysD3/data/usa_drugs.csv")
