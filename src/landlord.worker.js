import('@mtgoncurve/landlord').then(landlord => {
  // the thing that does work
  self.onmessage = function(e) {
    //console.log('Running simulation...');
    if (this.interval) {
      this.clearInterval(this.interval);
    }
    this.run_count = 0;
    // We expect the posted message to contain
    // input is the same shape as `Input` in https://github.com/mtgoncurve/landlord/lib/src/mtgoncruve.rs
    const input = e.data;
    this.interval = this.setInterval(() => {
      if (this.run_count >= input.total_runs) {
        //console.log('Simulation complete');
        this.clearInterval(this.interval);
        return;
      }
      // results is the same shape as `Output` in https://github.com/mtgoncurve/landlord/lib/src/mtgoncruve.rs
      const results = landlord.mtgoncurve_run(input);
      self.postMessage({
        results: results,
        runs: input.runs,
        task_id: input.task_id
      });
      if (typeof results == 'string' || results instanceof String) {
        //console.log("Simulation returned error");
        this.clearInterval(this.interval);
        return;
      }
      this.run_count += input.runs;
    }, 0);
  };
  // Inform the main thread that our onmessage handler is configured and ready to receive
  // postMessage requests
  self.postMessage(true);});
